import React from 'react';
import './App.css';
import { AppViews } from './pages';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getLocalStorage } from 'helpers/setTitleDocument';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userState } from 'recoil/users/state';
import { Button } from 'antd';
function App() {
  const setUser = useSetRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);
  React.useEffect(() => {
    const storage = getLocalStorage('user');
    if (storage.trim()) {
      const user = JSON.parse(storage) as UserInfo;
      user.token
        ? setUser({
            ...user,
            isLoggedIn: true,
            level: user.level,
          })
        : resetUserState();
    }
  }, [setUser, resetUserState]);
  return (
    <div className='app'>
      <ToastContainer />
      <AppViews />
    </div>
  );
}

export default App;
