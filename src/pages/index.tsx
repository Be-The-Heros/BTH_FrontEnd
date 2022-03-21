<<<<<<< HEAD
import Loading from "components/Loading";
import React, { Suspense } from "react";
=======
import React from 'react';
>>>>>>> 6e4a08676c3e918669ad1915ea5149bd84e1a5c6
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
<<<<<<< HEAD
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "recoil/users/state";
import LayoutMain from "templates/Layout";
import LayoutAuth from "templates/LayoutAuth";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ProfilePage from "./ProfilePage";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
=======
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import { PrivateRoute, PublicRoute } from 'routes';
import LayoutMain from 'templates/Layout';
import LayoutAuth from 'templates/LayoutAuth';
import ForgotPasswordPage from './ForgotPasswordPage';
import Profile from './Profile';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import { VerifyEmailPage } from './VerifyEmail';
>>>>>>> 6e4a08676c3e918669ad1915ea5149bd84e1a5c6

// import CreatePostPage from './CreatePost';
// import Homepage from './Home';

<<<<<<< HEAD
const Homepage = React.lazy(() => import("./Homepage"));
const CreatePostPage = React.lazy(() => import("./CreatePost"));
const ProfileSettingsPage = React.lazy(() => import("./ProfileSettings"));
interface CustomRouteProps {
  element?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
  children?: React.LazyExoticComponent<() => JSX.Element> | JSX.Element;
}
const PrivateRoute: React.FC<CustomRouteProps> = (props) => {
  const { children, element } = props;
  const [user] = useRecoilState(userState);
  const { isLoggedIn } = user;
  return isLoggedIn ? (
    <Suspense fallback={<Loading cover="content" />}>
      {element || children}
    </Suspense>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};
const PublicRoute: React.FC<CustomRouteProps> = (
  props
): React.ReactElement | null => {
  const { children, element } = props;
  return (
    <Suspense fallback={<Loading cover="content" />}>
      {element || children}
    </Suspense>
  );
};
export const AppViews = () => {
  const user = useRecoilValue(userState);

  React.useEffect(() => {
    if (user.isLoggedIn && user.level > 1) {
      window.location.href = "/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
=======
const Homepage = React.lazy(() => import('./Homepage'));
const CreatePostPage = React.lazy(() => import('./CreatePost'));
const ProfileSettingsPage = React.lazy(() => import('./ProfileSettings'));

export const AppViews = () => {
  const user = useRecoilValue(userState);

  // React.useEffect(() => {
  //   if (user.isLoggedIn && user.level > 1) {
  //     window.location.href = '/';
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
>>>>>>> 6e4a08676c3e918669ad1915ea5149bd84e1a5c6

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route path="/" element={<PublicRoute element={<ProfilePage />} />} />
          <Route
            path="/create-post"
            element={<PrivateRoute element={<CreatePostPage />} />}
          />
          <Route
            path="/profile/settings"
            element={<PrivateRoute element={<ProfileSettingsPage />} />}
          />
          <Route
            path='/verify/email'
            element={<PrivateRoute element={<VerifyEmailPage />} />}
          />
        </Route>
<<<<<<< HEAD
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
=======
        <Route
          path={`/profile`}
          element={<PublicRoute element={<Profile />} />}
        />
        <Route path='/auth' element={<LayoutAuth />}>
          <Route path='sign-in' element={<SignInPage />} />
          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='sign-up' element={<SignUpPage />} />
>>>>>>> 6e4a08676c3e918669ad1915ea5149bd84e1a5c6
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
