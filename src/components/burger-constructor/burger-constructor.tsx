import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../hooks/useSelector';
import {
  getOrderModalData,
  getOrderRequest,
  orderActions
} from '../../services/selector/slices/order-slice/order-slice';
import { useAction } from '../../hooks/useAction';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/selector/slices/user-slice/user-slice';

import {
  constructorActions,
  getConstructorBun,
  getConstructorIngredients
} from '../../services/selector/slices/constructor-slice/constructor-slice';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { resetOrderModal, postOrderThunk } = useAction(orderActions);
  const { resetConstructor } = useAction(constructorActions);

  const user = useSelector(getUser);
  const ingredients = useSelector(getConstructorIngredients);
  const bun = useSelector(getConstructorBun);

  const orderData = [bun?._id || ''] // Добавляем булочку в начало
    .concat(ingredients.map((i) => i._id)) // Добавляем ингредиенты
    .concat([bun?._id || '']) // Добавляем булочку в конец
    .filter((i) => i !== ''); // Убираем пустые строки

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    postOrderThunk(orderData);
    resetConstructor();
  };
  const closeOrderModal = () => {
    resetOrderModal();
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
