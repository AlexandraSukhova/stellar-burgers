import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/user-order-slice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.userOrders.loading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const orders: TOrder[] = useSelector((state) => state.userOrders.orders);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
