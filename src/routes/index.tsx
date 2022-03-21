import Loading from 'components/Loading';
import { Suspense } from 'react';
import { Navigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';

interface CustomRouteProps {
  element?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
  children?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
}
export const PrivateRoute: React.FC<CustomRouteProps> = (props) => {
  const { children, element } = props;
  const [user] = useRecoilState(userState);
  const { isLoggedIn } = user;
  return isLoggedIn ? (
    <Suspense fallback={<Loading cover='content' />}>
      {element || children}
    </Suspense>
  ) : (
    <Navigate to='/auth/sign-in' />
  );
};
export const PublicRoute: React.FC<CustomRouteProps> = (
  props
): React.ReactElement | null => {
  const { children, element } = props;
  return (
    <Suspense fallback={<Loading cover='content' />}>
      {element || children}
    </Suspense>
  );
};
