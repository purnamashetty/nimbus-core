import { PrintConfig } from '../shared/print-event';
import { PrintActions, PrintActionTypes } from '../actions/print.actions';


export interface PrintState {
  path: string;
  uiEvent: any;
  printConfig: PrintConfig;
}

const initialStatePrintConfig = new PrintConfig();

export const initialState: PrintState = {
  path: '',
  uiEvent: {},
  printConfig: initialStatePrintConfig
};

export function printReducer(state = initialState, action: PrintActions): PrintState {
  switch (action.type) {

    case PrintActionTypes.LoadPrintClickUpdate$:
      return action.payload.printClickUpdate$;

    default:
      return state;
  }
}
