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

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const { resetOrderModal, postOrderThunk } = useAction(orderActions);
  const { resetConstructor } = useAction(constructorActions);

  const user = useSelector(getUser);
  const ingredients = useSelector(getConstructorIngredients);
  const bun = useSelector(getConstructorBun);

  const orderData = [bun?._id || '']
    .concat(ingredients.map((i) => i._id))
    .concat([bun?._id || ''])
    .filter((i) => i !== '');

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = async () => {
    if (!user) {
      navigate('login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    // Отправляем запрос на сервер
    try {
      await postOrderThunk(orderData);
      resetConstructor(); // Очистка конструктора после успешного ответа
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    }
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
      constructorItems={constructorItems}
      price={price}
      orderModalData={orderModalData}
      orderRequest={orderRequest}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
