import { rootReducer } from './rootReducer';
import store from './store';

describe('Тестируем Root Reducer', () => {
  it('Корректный вызов root reducer', () => {
    // Инициализируем состояние, вызывая rootReducer без аргумента состояния (undefined) и с пустым действием
    const initialState = rootReducer(undefined, { type: '' });
    // Сравниваем полученное состояние с текущим состоянием хранилища, чтобы убедиться, что они совпадают
    expect(initialState).toEqual(store.getState());
  });
});
