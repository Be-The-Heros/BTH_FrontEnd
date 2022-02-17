import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import LayoutAuth from 'templates/LayoutAuth';
import LayoutMain from 'templates/Layout';
import ForgotPasswordPage from './forgotPassword';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
// import CreatePostPage from './CreatePost';
// import Homepage from './Home';

const Homepage = React.lazy(() => import('./Home'));
const CreatePostPage = React.lazy(() => import('./CreatePost'));

interface CustomRouteProps {
  element?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
  children?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
}
const PrivateRoute: React.FC<CustomRouteProps> = (props) => {
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
const PublicRoute: React.FC<CustomRouteProps> = (
  props
): React.ReactElement | null => {
  const { children, element } = props;

  return (
    <Suspense fallback={<Loading cover='content' />}>
      {element || children}
    </Suspense>
  );
};
export const AppViews = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route path='/' element={<PublicRoute element={<Homepage />} />} />
          <Route
            path='/create-post'
            element={<PrivateRoute element={<CreatePostPage />} />}
          />
        </Route>
        <Route path='/auth' element={<LayoutAuth />}>
          <Route path='sign-in' element={<SignInPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};
