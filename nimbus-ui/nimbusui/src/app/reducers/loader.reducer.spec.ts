import { loaderReducer, initialState } from './loader.reducer';

describe('Loader Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = loaderReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
