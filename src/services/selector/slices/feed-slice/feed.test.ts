import { feedSlice, initialState as initialFeedState } from './feed-slice';
import { getFeedThunk } from './feed-thunk';
import { mockFeed } from '../../../../utils/mocks';

// Мокаем API-запрос для получения фида
jest.mock('@api', () => ({
  getFeedsApi: jest.fn()
}));

describe('Тестируем редюсер Feed Slice', () => {
  it('Корректная обработка состояния ожидания', () => {
    // Вызываем редюсер с экшеном, имитирующим pending-состояние
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.pending.type
    });

    // Проверяем, что в состоянии установлен флаг загрузки
    expect(actualState).toEqual({
      ...initialFeedState,
      isLoading: true
    });
  });

  it('Корректная обработка состояния выполненого заказа', () => {
    // Вызываем редюсер с экшеном, имитирующим успешный ответ сервера
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.fulfilled.type,
      payload: mockFeed
    });

    // Проверяем, что данные успешно записаны в store
    expect(actualState).toEqual({
      ...initialFeedState,
      feed: mockFeed,
      orders: mockFeed.orders
    });
  });

  it('Корректная обработка ошибки', () => {
    const mockError = new Error('Ошибка загрузки feed');

    // Вызываем редюсер с экшеном, имитирующим ошибку
    const actualState = feedSlice.reducer(initialFeedState, {
      type: getFeedThunk.rejected.type,
      error: mockError
    });

    // Проверяем, что в состояние записана ошибка
    expect(actualState).toEqual({
      ...initialFeedState,
      error: mockError
    });
  });
});
