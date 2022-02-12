import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { SignInPage } from './SignIn';

const Home = React.lazy(() => import('./home'));
export const AppViews = () => {
  return (
    <Router>
      <Suspense fallback={<Loading cover='content' />}>
        <Routes>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
