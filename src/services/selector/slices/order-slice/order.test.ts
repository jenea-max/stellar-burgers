import {
  orderSlice,
  initialState as initialOrderState,
  orderActions
} from './order-slice';
import { mockOrder, mockPostOrder } from '../../../../utils/mocks';
import { getOrderByNumberThunk, postOrderThunk } from './order-thunk';

// Мокаем API, чтобы избежать реальных сетевых запросов в тестах
jest.mock('@api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

describe('Тестируем Order Slice', () => {
  describe('Сброс содержимого заказа в модальном окне', () => {
    it('Корректные очистка содержимого модального окна', () => {
      // Создаем состояние с предзаполненными данными
      const filledState = {
        ...initialOrderState,
        orderModalData: mockOrder.orders[0]
      };
      // Вызываем редьюсер с экшеном сброса данных модального окна
      const state = orderSlice.reducer(
        filledState,
        orderActions.resetOrderModal()
      );
      // Ожидаем, что данные в модальном окне будут сброшены
      expect(state).toEqual({
        ...filledState,
        orderModalData: null
      });
    });
  });
  describe('Ассинхронная функция получения заказа', () => {
    it('Корректное состояние ожидания', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.pending.type
      });
      // Проверяем, что в состоянии появился флаг ожидания
      expect(actualState).toEqual({
        ...initialOrderState,
        orderRequest: true
      });
    });

    it('Корректное состояние выполненного заказа', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.fulfilled.type,
        payload: mockPostOrder
      });

      // Проверяем, что в состояние добавились данные заказа
      expect(actualState).toEqual({
        ...initialOrderState,
        orderModalData: mockPostOrder.order
      });
    });

    it('Корректное состояние ошибки', () => {
      const mockError = new Error('Failed to fetch post order');
      const actualState = orderSlice.reducer(initialOrderState, {
        type: postOrderThunk.rejected.type,
        error: mockError
      });
      // Проверяем, что в состоянии зафиксирована ошибка
      expect(actualState).toEqual({
        ...initialOrderState,
        error: mockError
      });
    });
  });
  describe('Ассинхнонная функция получения заказа по номеру', () => {
    it('Корректное состояние ожидания', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.pending.type
      });
      // Проверяем, что установлен флаг ожидания
      expect(actualState).toEqual({
        ...initialOrderState,
        orderByNumberRequest: true
      });
    });

    it('Корректное состояние выполненного заказа', () => {
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: mockOrder
      });
      // Проверяем, что установлен флаг ожидания
      expect(actualState).toEqual({
        ...initialOrderState,
        orderByNumber: mockOrder.orders[0]
      });
    });

    it('Корректное состояние ошибки', () => {
      const mockError = new Error('Failed to fetch post order');
      const actualState = orderSlice.reducer(initialOrderState, {
        type: getOrderByNumberThunk.rejected.type,
        error: mockError
      });
      // Проверяем, что в состоянии сохранена ошибка
      expect(actualState).toEqual({
        ...initialOrderState,
        error: mockError
      });
    });
  });
});
