import { TConstructorIngredient } from '@utils-types';
import { constructorActions, constructorSlice } from './constructor-slice';
import { describe } from '@jest/globals';
import {
  bunFirstMock,
  bunSecondMock,
  mainFirstMock,
  mainSecondMock,
  sauceFirstMock,
  sauceSecondMock
} from '../../../../utils/mocks';

describe('Тестируем Constructor Slice', () => {
  describe('Добавление ингредиентов', () => {
    it('Корректное добавление булки в конструктор', () => {
      const initialState = { bun: null, ingredients: [] };

      // Добавляем первую булку в state
      let state = constructorSlice.reducer(
        initialState,
        constructorActions.addToConstructor(bunFirstMock)
      );
      // Проверяем, что булка добавлена корректно
      expect(state.bun).toMatchObject({
        ...bunFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      state = constructorSlice.reducer(
        state,
        constructorActions.addToConstructor(bunSecondMock)
      );
      // Заменяем булку на другую
      expect(state.bun).toMatchObject({
        ...bunSecondMock,
        id: expect.any(String)
      } as TConstructorIngredient);

      // Ингредиенты не должны были измениться
      expect(state.ingredients).toHaveLength(0);
    });

    it('Корректное добавление ингредиента в конструктор', () => {
      const initialState = { bun: null, ingredients: [] };

      // Добавляем первый ингредиент
      let state = constructorSlice.reducer(
        initialState,
        constructorActions.addToConstructor(mainFirstMock)
      );
      // Проверяем, что он добавлен корректно
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mainFirstMock,
        id: expect.any(String)
      } as TConstructorIngredient);
      // Добавляем второй ингредиент
      state = constructorSlice.reducer(
        state,
        constructorActions.addToConstructor(sauceFirstMock)
      );
      // Проверяем обновленный список ингредиентов
      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients.map((el) => el.name)).toEqual([
        'Начинка 1',
        'Соус 1'
      ]);
    });
  });
  describe('Удаление ингредиента', () => {
    it('Корректное удаление ингредиента из конструктора', () => {
      const initialState = {
        bun: { ...bunSecondMock, id: '234' },
        ingredients: [
          { ...mainSecondMock, id: '567' },
          { ...sauceSecondMock, id: '678' }
        ]
      };
      // Удаляем ингредиент с индексом 1
      let state = constructorSlice.reducer(
        initialState,
        constructorActions.removeFromConstructor(1)
      );
      // Проверяем, что остался только один ингредиент
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].name).toBe(mainSecondMock.name);

      // Проверяем, что булка не изменилась
      expect(state.bun?.name).toBe(bunSecondMock.name);
    });
  });
  describe('Изменение порядка ингредиентов в констурторе', () => {
    it('Корректное передвижение ингредиентов в конструкторе', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { ...mainFirstMock, id: '345' },
          { ...sauceFirstMock, id: '567' },
          { ...mainSecondMock, id: '456' }
        ]
      };

      // Меняем порядок: перемещаем элемент с индекса 0 на индекс 2
      const state = constructorSlice.reducer(
        initialState,
        constructorActions.reorderConstructor({ from: 0, to: 2 })
      );
      // Проверяем новый порядок
      expect(state.ingredients.map((el) => el.name)).toEqual([
        'Соус 1',
        'Начинка 2',
        'Начинка 1'
      ]);
    });
  });
  describe('Очистка конструктора', () => {
    it('Корретная очистка конструктора и его приход в начальное состояние', () => {
      const initialState = { bun: null, ingredients: [] };

      const filledState = {
        bun: { ...bunFirstMock, id: '123' },
        ingredients: [{ ...mainSecondMock, id: '345' }]
      };

      // Очищаем конструктор
      const state = constructorSlice.reducer(
        filledState,
        constructorActions.resetConstructor()
      );
      // Проверяем, что состояние сброшено
      expect(state).toEqual(initialState);
    });
  });
});
