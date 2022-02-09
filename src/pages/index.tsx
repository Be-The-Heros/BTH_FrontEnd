import Loading from 'components/Loading';
import React, { Suspense } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

const Home = React.lazy(() => import('./home'));
export const AppViews = () => {
  return (
    <Router>
      <Suspense fallback={<Loading cover='content' />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
