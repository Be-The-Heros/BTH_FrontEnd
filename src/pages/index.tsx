import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

const Home = React.lazy(() => import('./home'));
const SignInPage = React.lazy(() => import('./SignIn'));
const SignUpPage = React.lazy(() => import('./SignUp'));
const ForgotPasswordPage = React.lazy(() => import('./forgotPassword'));
export const AppViews = () => {
  return (
    <Router>
      <Suspense fallback={<Loading cover='content' />}>
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/sign-in' />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
