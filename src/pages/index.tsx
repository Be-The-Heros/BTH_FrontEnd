import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutAuth from 'templates/LayoutAuth';
import LayoutMain from 'templates/Layout';
import ForgotPasswordPage from './forgotPassword';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';

const Homepage = React.lazy(() => import('./Home'));
const CreatePostPage = React.lazy(() => import('./CreatePost'));

export const AppViews = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route
            path='/'
            element={
              <Suspense fallback={<Loading cover='content' />}>
                <Homepage />
              </Suspense>
            }
          />
          <Route
            path='/create-post'
            element={
              <Suspense fallback={<Loading cover='content' />}>
                <CreatePostPage />
              </Suspense>
            }
          />
        </Route>

        <Route path='/auth' element={<LayoutAuth />}>
          <Route path='sign-in' element={<SignInPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
