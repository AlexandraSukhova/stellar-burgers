import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders } from '../../services/slices/feed-slice';
import { fetchFeed } from '../../services/slices/assync-thunk/feed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getAllOrders);
  const dispatch = useDispatch();

  const handleGetFeeds = () => {
    location.assign('/feed');
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
