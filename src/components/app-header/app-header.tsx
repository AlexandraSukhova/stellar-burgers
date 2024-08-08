import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.user?.name);
  const [isConstructorActive, setIsConstructorActive] =
    useState<boolean>(false);
  const [isOrderListActive, setIsOrderListActive] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    location.pathname === '/'
      ? setIsConstructorActive(true)
      : setIsConstructorActive(false);
    location.pathname === '/feed'
      ? setIsOrderListActive(true)
      : setIsOrderListActive(false);
  }, [location.pathname]);

  return (
    <AppHeaderUI
      userName={userName}
      isConstructorActive={isConstructorActive}
      isOrderListActive={isOrderListActive}
    />
  );
};
