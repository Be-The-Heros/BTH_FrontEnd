import { atom } from 'recoil';
import { USER_INFO_KEY } from './constants';

export const userState = atom<UserInfo>({
  key: USER_INFO_KEY, // unique ID (with respect to other atoms/selectors)
  default: {
    uid: '',
    name: '',
    email: '',
    avatar: 'https://picsum.photos/200',
    date_of_birth: '',
    last_name: '',
    fist_name: '',
    isLoggedIn: false,
    level: 0,
    is_otp: false,
    is_locked: false,
    status: false,
    is_reported: false,
  }, // default value (aka initial value)
});
