import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  fetchOrderBurger,
  resetOrderModal
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const bun = useSelector(
    (state) => state.burgerConstructor.constructorItems.bun
  );
  const ingredients = useSelector(
    (state) => state.burgerConstructor.constructorItems.ingredients
  );

  const orderData = ingredients
    .map((i) => i._id)
    .concat([bun?._id || ''], [bun?._id || ''])
    .filter((i) => i !== '');

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );

  const orderModalData = useSelector(
    (state) => state.burgerConstructor.orderModalData
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(fetchOrderBurger(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModal());
    navigate('/');
  };

  let ingredientPrice = 0;
  constructorItems.ingredients.forEach((i) => (ingredientPrice += i.price));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      ingredientPrice,
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
