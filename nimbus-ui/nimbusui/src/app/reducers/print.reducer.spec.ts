import { printReducer, initialState } from './print.reducer';

describe('Print Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = printReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
