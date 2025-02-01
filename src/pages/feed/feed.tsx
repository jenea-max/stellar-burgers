import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useCallback } from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  feedActions,
  getFeetOrders
} from '../../services/selector/slices/feed-slice/feed-slice';
import { useAction } from '../../hooks/useAction';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeetOrders);

  const { getFeedThunk } = useAction(feedActions);

  useEffect(() => {
    getFeedThunk();
  }, []);

  const handleGetFeeds = useCallback(() => {
    // Обновляем только ленту заказов, без перезагрузки страницы
    getFeedThunk();
  }, [getFeedThunk]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
