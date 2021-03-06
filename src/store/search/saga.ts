import { AnyAction } from 'redux';
import {
    all, call, put, takeEvery,
} from 'redux-saga/effects';
import indexApi from 'api/index';
import { UserBalanceResType } from '../types';

function* getUserBalance(action: AnyAction) {
    try {
        const userBalanceRes: UserBalanceResType = yield call(indexApi.getUserBalance);
        yield put({
            type: 'updateUserBalanceInfo',
            userBalanceInfo: userBalanceRes.data.data,
        });
    } catch (error: any) {
        // //console.log();
    }
}

const searchSagas = [
    takeEvery('updateUserAccount', getUserBalance),
];

export default searchSagas;
