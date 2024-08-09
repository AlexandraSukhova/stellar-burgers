import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getAllOrders } from '../../services/slices/feed-slice';
import { getIngredients } from '../../services/slices/ingredient-slice';
import { getAuthenticated } from '../../services/slices/user-slice';
import { getUserOrders } from '../../services/slices/user-order-slice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const params = useParams();
  const ingredients: TIngredient[] = useSelector(getIngredients);
  const isAuth = useSelector(getAuthenticated);
  const orders = useSelector(getAllOrders);
  const userOrders = useSelector(getUserOrders);
  let allOrders: TOrder[];

  !isAuth
    ? (allOrders = orders)
    : (allOrders =
        orders.concat(
          userOrders
        )); /** для отображения модальных с деталями всех заказов в профиле */

  const orderData: TOrder | undefined = allOrders.find(
    (i) => i.number === Number(params.number)
  );

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
