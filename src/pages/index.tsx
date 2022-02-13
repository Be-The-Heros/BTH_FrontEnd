import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ForgotPasswordPage } from './forgotPassword';
import { SignInPage } from './SignIn';
import { SignUpPage } from './SignUp';

const Home = React.lazy(() => import('./home'));
export const AppViews = () => {
  return (
    <Router>
      <Suspense fallback={<Loading cover='content' />}>
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
