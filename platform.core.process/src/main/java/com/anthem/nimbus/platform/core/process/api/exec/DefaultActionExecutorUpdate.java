/**
 * 
 */
package com.anthem.nimbus.platform.core.process.api.exec;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import com.anthem.nimbus.platform.core.process.api.cache.session.PlatformSession;
import com.anthem.nimbus.platform.spec.contract.process.ProcessExecutorEvents;
import com.anthem.nimbus.platform.spec.model.AbstractEvent.SuppressMode;
import com.anthem.nimbus.platform.spec.model.command.Command;
import com.anthem.nimbus.platform.spec.model.command.CommandElement.Type;
import com.anthem.nimbus.platform.spec.model.command.CommandMessage;
import com.anthem.nimbus.platform.spec.model.dsl.EnableParamStateTree;
import com.anthem.nimbus.platform.spec.model.dsl.binder.ExecutionStateTree;
import com.anthem.nimbus.platform.spec.model.dsl.binder.ModelStateAndConfig;
import com.anthem.nimbus.platform.spec.model.dsl.binder.QuadModel;
import com.anthem.nimbus.platform.spec.model.dsl.binder.StateAndConfig;
import com.anthem.nimbus.platform.spec.model.dsl.binder.StateAndConfig.Param;

/**
 * @author Soham Chakravarti
 *
 */
@Component("default._update$execute")
public class DefaultActionExecutorUpdate extends AbstractProcessTaskExecutor {

	
	@SuppressWarnings("unchecked")
	@Override
	public <R> R doExecuteInternal(CommandMessage cmdMsg) {
		
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		requestAttributes.setAttribute("testName","jayant",RequestAttributes.SCOPE_REQUEST);
		
		Command cmd = cmdMsg.getCommand();
		QuadModel<?, ?> q = PlatformSession.getOrThrowEx(cmd);
		
		StateAndConfig.Model<?, ?> sac = cmd.isView() ? q.getView() : q.getCore();
		
		String path = cmd.buildUri(cmd.root().findFirstMatch(Type.DomainAlias).next());
		
		Param<Object> param = sac.findParamByPath(path);
		
		//Convert from json payload to Object
		Object state = convert(cmdMsg, param);
		
		//Check if the param is associated with a model that manintains parameter state
		boolean useParamStateTree = useParamStateTree(param);
		if(useParamStateTree){
			loadParamStateTree(param);
		}
		
		//Execute update with suppressMode
		q.getEventPublisher().apply(SuppressMode.ECHO);
		param.setState(state);
		q.getEventPublisher().apply(null); // should be persist only
		
		//fire rules post update
		q.fireAllRules();
		// clear the apply on event publisher
	
		
		// get, new(save), replace, delete
		return (R)Boolean.TRUE;
	}
	
	@Override
	protected void publishEvent(CommandMessage cmdMsg, ProcessExecutorEvents e) {
		
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 */
	private boolean useParamStateTree(Param<Object> param){	
		Class<?> mapsToClass = param.getRootParent().getConfig().getReferredClass();
		if( mapsToClass.getAnnotation(EnableParamStateTree.class) != null){
			return true;
		}
		return false;
	}	
	
	
	/**
	 * 
	 * @param param
	 */
	private void loadParamStateTree(Param<Object> param){
		ModelStateAndConfig<?,?> parent = (ModelStateAndConfig<?,?>)param.getRootParent();
		ExecutionStateTree stateTree = parent.getExecutionStateTree();
		if(stateTree == null){
			stateTree = new ExecutionStateTree();
			parent.setExecutionStateTree(stateTree);
		}
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		requestAttributes.setAttribute(ExecutionStateTree.TRIGGER_PARAM_KEY, param, RequestAttributes.SCOPE_REQUEST);
		stateTree.resetStateForParameter();		
	}
	
	
}
