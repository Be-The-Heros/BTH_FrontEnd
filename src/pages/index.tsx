import { setLocalStorage } from 'helpers/setTitleDocument';
import { useDevice } from 'hooks/setMobileDevice/useSetMobileDevice';
import { KycScreen } from 'mobile';
import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { PrivateRoute, PublicRoute } from 'routes';
import LayoutMain from 'templates/Layout';
import LayoutAuth from 'templates/LayoutAuth';
import { ChatsPage } from './chat';
import { EditPostPage } from './EditPostPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import { InviteChatPage } from './InviteChat';
import { KycPage } from './kycPage';
import SignInPage from './SignIn';
import SignUpPage from './SignUp';
import { VerifyEmailPage } from './VerifyEmail';

const Homepage = React.lazy(() => import('./Homepage'));
const CreatePostPage = React.lazy(() => import('./CreatePost'));
const ProfileSettingsPage = React.lazy(() => import('./ProfileSettings'));
const ProfilePage = React.lazy(() => import('./ProfilePage'));
const PostDetailPage = React.lazy(() => import('./PostDetailPage'));

export const AppViews = () => {
  const [isMobile] = useDevice();
  React.useEffect(() => {
    const token = window.location.search.split('token=')[1];
    if (token?.trim()) {
      setLocalStorage('token', token);
    }
  }, [window.location.pathname]);
  if (isMobile) {
    return (
      <Router>
        <Routes>
          <Route
            path='/profile/kyc'
            element={<PublicRoute element={<KycScreen />} />}
          />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route path='/' element={<PublicRoute element={<Homepage />} />} />
          {/* POST  ROUTE */}
          <Route
            path='/edit-post/:post_id'
            element={
              <PrivateRoute>
                <EditPostPage />
              </PrivateRoute>
            }
          />

          <Route
            path='/create-post'
            element={<PrivateRoute element={<CreatePostPage />} />}
          />
          <Route
            path='/post/detail/:post_id'
            element={<PublicRoute element={<PostDetailPage />} />}
          />

          {/* PROFILE ROUTE */}
          <Route path='/profile'>
            <Route
              path=':uid'
              element={<PublicRoute element={<ProfilePage />} />}
            />
            <Route
              path='settings'
              element={<PrivateRoute element={<ProfileSettingsPage />} />}
            />

            <Route
              path='kyc'
              element={<PrivateRoute element={<KycPage />} />}
            />
          </Route>

          {/* CHECKING ROUTE */}
          <Route
            path='/verify/email'
            element={<PrivateRoute element={<VerifyEmailPage />} />}
          />
          <Route path='/invite/:invite_id' element={<InviteChatPage />} />
        </Route>
        {/* AUTHENTICATION ROUTE */}

        <Route
          path='/chat'
          element={
            <PrivateRoute>
              <ChatsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/chat/:id'
          element={
            <PrivateRoute>
              <ChatsPage />
            </PrivateRoute>
          }
        />

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
