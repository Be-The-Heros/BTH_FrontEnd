import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutAuth from 'templates/LayoutAuth';
import LayoutMain from 'templates/LayoutMain';
import ForgotPasswordPage from './forgotPassword';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

const Home = React.lazy(() => import('./home'));

export const AppViews = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route
            path='/'
            element={
              <Suspense fallback={<Loading cover='content' />}>
                <Home />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <Routes>
        <Route path='/' element={<LayoutAuth />}>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
