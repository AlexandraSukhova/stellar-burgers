import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
