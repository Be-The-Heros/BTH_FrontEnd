import React from 'react';
import './App.css';
import { AppViews } from './pages';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import { useQuerySessions } from 'hooks/auth/sessions';
function App() {
  const setUser = useSetRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);
  const sessions = useQuerySessions();

  React.useEffect(() => {
    if (sessions.isSuccess) {
      setUser({
        ...sessions.data.data,
        isLoggedIn: true,
      });
      return;
    }
    if (sessions.isError) {
      resetUserState();
      setUser((curr) => {
        return {
          ...curr,
          isLoggedIn: false,
        };
      });
    }
  }, [sessions.isSuccess, sessions.isError]);

  return (
    <div className='app'>
      <ToastContainer />
      <AppViews />
    </div>
  );
}

export default App;
