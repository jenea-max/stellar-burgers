import {
  ingredientsSlice,
  initialState as initialIngredientsState
} from './ingredients-slice';
import { mockIngredients } from '../../../../utils/mocks';
import { getIngredientsThunk } from './ingredients-thunk';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('Тестируем Ingredients Slice', () => {
  // Проверяем, что при ожидании загрузки isLoading становится true
  it('Корректная обработка состояния ожидания', () => {
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.pending.type
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      isLoading: true
    });
  });

  // Проверяем, что успешное выполнение запроса обновляет список ингредиентов
  it('Корректная обработка состояния выполненого заказа', () => {
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      ingredients: mockIngredients
    });
  });
  // Проверяем, что при ошибке загрузки состояние содержит сообщение об ошибке
  it('Корректная обработка ошибки', () => {
    const mockError = new Error('Ошибка загрузки ингредиентов');
    const actualState = ingredientsSlice.reducer(initialIngredientsState, {
      type: getIngredientsThunk.rejected.type,
      error: mockError
    });
    expect(actualState).toEqual({
      ...initialIngredientsState,
      error: mockError
    });
  });
});
