import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../hooks/useSelector';
import { getUser } from '../../services/selector/slices/user-slice/user-slice';

export const AppHeader: FC = () => {
  const user = useSelector(getUser);
  return <AppHeaderUI userName={user?.name} />;
};
