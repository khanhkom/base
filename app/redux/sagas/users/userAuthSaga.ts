import {put, call, takeEvery} from 'redux-saga/effects';
import {
  getProfileInfor,
  loginSocial,
  loginDetox,
} from '../../services/api/functions/user';
import {setUserInformation} from '../../redux/actions/users';
import {customAxios} from '../../services/api/helpers';
import {rootServerInstance} from '../../services/api/api-service';
import AsyncStorageUtils from '@app/utils/storage';
import NavigationService from '../../navigators/NavigationService';
import {NameEvents, recordEvent} from '@app/utils/helpers/EventManage';
import {showCustomToastMessage} from '@app/utils/library';

const TYPE_ACTION = {
  USER_LOGIN: 'USER_LOGIN',
};

const loginSocialAPI = (body: loginParams) => loginSocial(body);
export interface loginType {
  data: {
    type: string;
    token: string;
    avatar: string;
    isDetox?: boolean;
  };
}
export interface loginParams {
  type: string;
  token: string;
}
function* login({data}: loginType) {
  try {
    const body: loginParams = {type: data.type, token: data.token};
    let resData = {};
    if (data?.isDetox) {
      resData = yield call(loginDetox);
    } else {
      resData = yield call(loginSocialAPI, body);
    }
    if (resData.status !== 200 || !resData?.data?.data?.token) {
      yield put({
        type: 'REQUEST_FAILS',
      });
      showCustomToastMessage('Lỗi đăng nhập vui lòng thử lại!');
      recordEvent(
        NameEvents.LOGIN_FAIL,
        JSON.stringify({
          ...resData?.data?.data,
          ...body,
        }),
      );
    } else {
      const userinfor = resData?.data?.data;
      const {token} = userinfor;

      yield (customAxios.defaults.headers.common.Authorization = `Bearer ${token}`);
      yield rootServerInstance.setHeader('Authorization', token);
      yield (rootServerInstance.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`);
      const keyHello = yield AsyncStorageUtils.get(
        AsyncStorageUtils.KEY.KEY_HELLO,
      );
      const basicBody = yield call(getProfileInfor);
      const {data: bodyData, status} = basicBody?.data;
      const dataUser = {
        ...userinfor,
        // ...transformResponse(bodyData && bodyData),
        ...bodyData,
        social:
          data.type !== 'local' ? {type: data.type, token: data.token} : null,
        accessToken: token,
        avatar: bodyData.avatar ?? data.avatar,
        keyHello: keyHello,
      };
      AsyncStorageUtils.save(
        AsyncStorageUtils.KEY.INIT_STORGE,
        JSON.stringify(dataUser),
      );
      AsyncStorageUtils.save(AsyncStorageUtils.KEY.KEY_HELLO, '1');
      AsyncStorageUtils.save(
        AsyncStorageUtils.KEY.FIRST_TIME_LOGIN,
        new Date().toISOString(),
      );

      yield put(setUserInformation(dataUser));

      recordEvent(NameEvents.LOGIN, {
        type: data.type,
        bodyinfomation: userinfor?.bodyinfomation,
      });
      NavigationService.replace('LoginSuccess', {
        type: data.type,
        bodyinfomation: userinfor?.bodyinfomation,
      });
    }
  } catch (error) {
    console.log('error login', error);
    recordEvent(NameEvents.LOGIN_FAIL, error);
  }
}

export function* watchFetchLogIn() {
  yield takeEvery(TYPE_ACTION.USER_LOGIN, login);
}
