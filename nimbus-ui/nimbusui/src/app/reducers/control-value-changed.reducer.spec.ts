import { controlValueChangedReducer, initialState } from './control-value-changed.reducer';

describe('ControlValueChanged Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = controlValueChangedReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
