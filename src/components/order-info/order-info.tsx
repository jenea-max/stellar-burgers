import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfoUI, Preloader } from '@ui';
import { getIngredients } from '../../services/selector/slices/ingredients-slice/ingredients-slice';
import { useSelector } from '../../hooks/useSelector';
import { useAction } from '../../hooks/useAction';
import { orderActions } from '../../services/selector/slices/order-slice/order-slice';
import { orderInfoDataSelector } from '../../services/selector/selectors/index';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const { getOrderByNumberThunk } = useAction(orderActions);
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const orderData = useSelector(orderInfoDataSelector(number || ''));

  useEffect(() => {
    if (!orderData) {
      getOrderByNumberThunk(Number(number));
    }
  }, [orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
