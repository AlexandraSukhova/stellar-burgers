import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/assync-thunk/user-oreders';
import { Preloader } from '@ui';
import {
  getUserOrders,
  isUserOrdersLoading
} from '../../services/slices/user-order-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector(isUserOrdersLoading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const orders: TOrder[] = useSelector(getUserOrders);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
