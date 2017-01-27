/**
 * 
 */
package com.anthem.nimbus.platform.core.process.api.support;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @author Jayant Chaudhuri
 *
 */
@Component
public class ProcessBeanHelper implements ApplicationContextAware{

	private static ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext appCtx) throws BeansException {
		applicationContext = appCtx;
	}
	
	/**
	 * 
	 * @return
	 */
	public static ApplicationContext getApplicationContext(){
		return applicationContext;
	}
}
