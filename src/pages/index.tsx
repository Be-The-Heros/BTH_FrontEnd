import { Header } from 'components';
import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';

const Home = React.lazy(() => import('./home'));
const LayoutAuth = React.lazy(() => import('templates/LayoutAuth'));
const SignInPage = React.lazy(() => import('./SignIn'));
const SignUpPage = React.lazy(() => import('./SignUp'));
const ForgotPasswordPage = React.lazy(() => import('./forgotPassword'));

export const AppViews = () => {
  const [user] = useRecoilState(userState);
  const { isLoggedIn } = user;

  const renderAuth = () => {
    return (
      <LayoutAuth>
        <Suspense fallback={<Loading cover='content' />}>
          <Routes>
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='*' element={<Navigate to='/sign-in' />} />
          </Routes>
        </Suspense>
      </LayoutAuth>
    );
  };

  const renderPage = () => {
    return (
      <React.Fragment>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </React.Fragment>
    );
  };
  return (
    <Router>
      <Suspense fallback={<Loading cover='content' />}>
        {!isLoggedIn ? renderAuth() : renderPage()}
      </Suspense>
    </Router>
  );
};
