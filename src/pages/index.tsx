import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from 'recoil/users/state';
import { PrivateRoute, PublicRoute } from 'routes';
import LayoutMain from 'templates/Layout';
import LayoutAuth from 'templates/LayoutAuth';
import CreatePostPage from './CreatePost';
import { EditPostPage } from './EditPostPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { PostDetailPage } from './PostDetailPage';
import Profile from './Profile';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import { VerifyEmailPage } from './VerifyEmail';

// import CreatePostPage from './CreatePost';
// import Homepage from './Home';

const Homepage = React.lazy(() => import('./Homepage'));
// const CreatePostPage = React.lazy(() => import("./CreatePost"));
const ProfileSettingsPage = React.lazy(() => import('./ProfileSettings'));
const ProfilePage = React.lazy(() => import('./ProfilePage'));

export const AppViews = () => {
  const user = useRecoilValue(userState);

  // React.useEffect(() => {
  //   if (user.isLoggedIn && user.level > 1) {
  //     window.location.href = '/';
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route path='/' element={<PublicRoute element={<Homepage />} />} />
          <Route
            path='/profile/:uid'
            element={<PublicRoute element={<ProfilePage />} />}
          />
          <Route
            path='/profile/settings'
            element={<PrivateRoute element={<ProfileSettingsPage />} />}
          />
          <Route
            path='/post/detail/:post_id'
            element={<PostDetailPage />}
          ></Route>
          <Route path='/edit-post/:post_id' element={<EditPostPage />}></Route>
          <Route
            path='/create-post'
            element={<PrivateRoute element={<CreatePostPage />} />}
          />

          <Route
            path='/verify/email'
            element={<PrivateRoute element={<VerifyEmailPage />} />}
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
