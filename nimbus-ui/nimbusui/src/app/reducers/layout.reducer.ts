import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';
import { TopBarConfig, FooterConfig } from '../model/menu-meta.interface';
import { MenuItem } from '../shared/menuitem';
import { Param } from '../shared/param-state';


export interface LayoutState {
  fixLayout: boolean;
  topBar: TopBarConfig;
  menu: MenuItem[];
  footer: FooterConfig;
  actiontray: Param;
  modalList: Param[];
}

export const initialLayoutState = {
  fixLayout: false,
  topBar: 'any',
  menu: [],
  footer: 'any',
  actiontray: 'any',
  modalList: []
};

export function layoutReducer(state: any, action: LayoutActions): LayoutState {
  
  switch (action.type) {

    case LayoutActionTypes.LoadLayout:
      return action.payload.layout;

    default:
      return state;
  }
}
