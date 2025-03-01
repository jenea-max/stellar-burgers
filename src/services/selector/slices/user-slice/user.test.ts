import {
  userSlice,
  userActions,
  initialState as initialUserState
} from './user-slice';
import { mockUser } from '../../../../utils/mocks';
import {
  checkUserAuth,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from './user-thunk';

// Мокаем API-запросы, чтобы изолировать тестируемую логику
jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutUserApi: jest.fn()
}));

describe('Тестируем User Slice', () => {
  // Тестируем логику регистрации
  describe('Регистрация', () => {
    it('Изменение состояния регистрация', () => {
      const state = userSlice.reducer(
        initialUserState,
        userActions.authChecked() // Эмулируем действие проверки авторизации
      );

      expect(state).toEqual({
        ...initialUserState,
        isAuthChecked: true // Убедимся, что поле isAuthChecked стало true
      });
    });
  });

  // Тестируем логику входа в аккаунт
  describe('Логин', () => {
    it('Изменение состояние при входе в аккаунт', () => {
      const filledState = {
        ...initialUserState,
        user: mockUser.user // Имитация уже авторизованного пользователя
      };

      const state = userSlice.reducer(filledState, userActions.userLogout());

      expect(state).toEqual({
        ...filledState,
        user: null, // После выхода из аккаунта пользователь должен быть null
        isAuthChecked: true // Устанавливаем isAuthChecked в true после выхода
      });
    });
  });

  // Тестируем поведение функции регистрации
  describe('Функция для регистрации', () => {
    it('Корректное отображение ожидания', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.pending.type // Подаем тип ожидания регистрации
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true // Убедимся, что флаг запроса стал true
      });
    });

    it('Корректное отображение выполненного действия', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.fulfilled.type,
        payload: mockUser.user // Имитация успешной регистрации
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user, // Пользователь должен быть сохранен в состоянии
        isAuthenticated: true // Убедимся, что пользователь авторизован
      });
    });

    it('Корректное отображение ошибки', () => {
      const mockError = new Error('Ошибка регистрации пользователя');
      const actualState = userSlice.reducer(initialUserState, {
        type: registerUserThunk.rejected.type,
        error: mockError // Эмулируем ошибку
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError // Ошибка должна быть сохранена в состоянии
      });
    });
  });

  // Тестируем вход в аккаунт
  describe('Функция для входа в аакаунт', () => {
    it('Корректное отображение ожидания', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.pending.type // Тип запроса входа
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true // Включаем флаг ожидания
      });
    });

    it('Корректное отображение выполненного действия', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.fulfilled.type,
        payload: mockUser // Имитация успешного входа
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser, // Сохраняем данные пользователя
        isAuthenticated: true // Обновляем статус авторизации
      });
    });

    it('Корректное отображение ошиибки', () => {
      const mockError = new Error('Ошибка при входе в аккаунт пользователя');
      const actualState = userSlice.reducer(initialUserState, {
        type: loginUserThunk.rejected.type,
        error: mockError // Эмулируем ошибку при входе
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError // Сохраняем ошибку в состоянии
      });
    });
  });

  // Тестируем проверку авторизации
  describe('Функция проверки авторизации', () => {
    it('Корректное отображение ожидания', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.pending.type // Тип запроса для проверки
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true // Тип запроса для проверки
      });
    });

    it('Корректное отображение выполненного действия', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser // Имитация успешной авторизации
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user, // Сохраняем данные пользователя
        isAuthenticated: true, // Обновляем статус авторизации
        isAuthChecked: true // Устанавливаем флаг проверки
      });
    });

    it('Корректное отображение ошибки', () => {
      const mockError = new Error('Ошибка при авторизации пользователя');
      const actualState = userSlice.reducer(initialUserState, {
        type: checkUserAuth.rejected.type,
        error: mockError // Эмулируем ошибку при проверке
      });
      expect(actualState).toEqual({
        ...initialUserState,
        isAuthChecked: true, // Устанавливаем флаг проверки
        error: mockError // Сохраняем ошибку
      });
    });
  });

  // Тестируем обновление данных пользователя
  describe('Функция обновления информации о пользователе', () => {
    it('Корректное отображение состояния ожидания', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.pending.type // Тип запроса на обновление
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true // Устанавливаем флаг ожидания
      });
    });

    it('Корректное отображение выполненного действия', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.fulfilled.type,
        payload: mockUser // Имитация успешного обновления
      });

      expect(actualState).toEqual({
        ...initialUserState,
        user: mockUser.user // Имитация успешного обновления
      });
    });

    it('Корректное отображение ошибки', () => {
      const mockError = new Error('Ошибка обновления данных');
      const actualState = userSlice.reducer(initialUserState, {
        type: updateUserThunk.rejected.type,
        error: mockError // Эмулируем ошибку
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError // Сохраняем ошибку
      });
    });
  });

  // Тестируем логику выхода из аккаунта
  describe('Функция выхода из аккаунта', () => {
    it('Корректное отображение ожидания', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.pending.type // Тип запроса на выход
      });
      expect(actualState).toEqual({
        ...initialUserState,
        request: true // Включаем флаг запроса
      });
    });

    it('Корректное отображение выполненного действия', () => {
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.fulfilled.type // Тип запроса на успешный выход
      });

      expect(actualState).toEqual(initialUserState); // Состояние возвращается к начальному
    });

    it('Корректное отображение ошибки', () => {
      const mockError = new Error('Ошибка при выходе из аккаунта');
      const actualState = userSlice.reducer(initialUserState, {
        type: logoutUserThunk.rejected.type,
        error: mockError // Эмулируем ошибку при выходе
      });
      expect(actualState).toEqual({
        ...initialUserState,
        error: mockError // Ошибка должна быть сохранена в состоянии
      });
    });
  });
});
