import { getOrdersThunk } from './orders-thunk';
import {
  ordersSlice,
  initialState as initialOrdersState
} from './orders-slice';
import { mockOrder } from '../../../../utils/mocks';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn()
}));

describe('Тестируем Orders Slice', () => {
  it('Корректное отображение состояния ожидания', () => {
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.pending.type
    });

    // Ожидаем, что в состоянии появится флаг загрузки
    expect(actualState).toEqual({
      ...initialOrdersState,
      isLoading: true
    });
  });

  it('Корректное отображение состояния выполеннного заказа', () => {
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.fulfilled.type,
      payload: mockOrder.orders
    });

    // Ожидаем, что в состоянии появятся полученные заказы
    expect(actualState).toEqual({
      ...initialOrdersState,
      orders: mockOrder.orders
    });
  });

  it('Корректное отображение ошибки', () => {
    const mockError = new Error('Failed to fetch orders');
    const actualState = ordersSlice.reducer(initialOrdersState, {
      type: getOrdersThunk.rejected.type,
      error: mockError
    });

    // Ожидаем, что в состояние запишется ошибка
    expect(actualState).toEqual({
      ...initialOrdersState,
      errors: mockError
    });
  });
});
