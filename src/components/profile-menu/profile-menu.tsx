import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { fetchUserLogout } from '../../services/slices/assync-thunk/user';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchUserLogout()).then(() => navigate('/login'));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
