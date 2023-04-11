import { all, put, takeEvery } from 'redux-saga/effects';

import action from './action';


import { 
	LOOK_UP_ALCOHOL,
	LOOK_UP_BODY_TYPE,
	LOOK_UP_EDUC_LEVEL,
	LOOK_UP_ETHNICITY,
	LOOK_UP_EXER_REGIMEN,
	LOOK_UP_EYE_COLOR,
	// LOOK_UP_INCOME_LEVEL,
	LOOK_UP_ISSUE_CATEG, 
	LOOK_UP_GENDER,
	LOOK_UP_HAIR_COLOR,
	LOOK_UP_HEART,
	LOOK_UP_HEIGHT,
	LOOK_UP_HOBBY,
	LOOK_UP_KID_POLICY,
	LOOK_UP_KID_SITUATION,
	LOOK_UP_LANGUAGE,
	LOOK_UP_PET_POLICY,
	LOOK_UP_POS_POLITICS,
	LOOK_UP_PREF_SMOKING,
	LOOK_UP_PROFESSION,
	LOOK_UP_RATING,
	LOOK_UP_RELATIONSHIP_TYPE,
	LOOK_UP_RELIG_BELIEF,
	LOOK_UP_SUBSCRIPTION_PLAN,
	HTTP_STATUS
} from '../../constants/Constants';

import { lookupRequest, userRequest } from '../../request/request'

/////////////////////////
// reqLookUpGetFields()
/////////////////////////
function* reqLookUpGetFields({ payload }) {
	const lookUp = payload;
	try {
		console.log('reqUserLookUpGet()');
		console.log('lookUp : '+ lookUp);

		const res = yield lookUp === LOOK_UP_SUBSCRIPTION_PLAN ? userRequest.getSubscriptionPlan() : lookupRequest.getSearchLookup(lookUp);
		console.log('searchLookup response : ', res);

		if (res.data?.status?.code == HTTP_STATUS._200) {
			switch(lookUp) {
				case LOOK_UP_ISSUE_CATEG:
					yield put({
						type    : action.LOOK_UP_SET_ISSUE_CATEG,
						payload : res?.data?.lookUp?.filter(categoryIssue => categoryIssue.code !== 'CAN')
					});
					break;
				// case LOOK_UP_INCOME_LEVEL:
				// 	yield put({
				// 		type    : action.LOOK_UP_SET_INCOME_lEVEL,
				// 		payload : res.data.lookUp
				// 	});
				// 	break;
				case LOOK_UP_HEART:
					yield put({
						type    : action.LOOK_UP_SET_HEART,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_RATING:
					yield put({
						type    : action.LOOK_UP_SET_RATING,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_HOBBY:
					yield put({
						type    : action.LOOK_UP_SET_HOBBY_CODE,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_KID_POLICY:
					yield put({
						type    : action.LOOK_UP_SET_KID_POLICY,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_LANGUAGE:
					yield put({
						type    : action.LOOK_UP_SET_LANGUAGE,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_ALCOHOL:
					yield put({
						type    : action.LOOK_UP_SET_PREF_ALCOHOL,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_BODY_TYPE:
					yield put({
						type    : action.LOOK_UP_SET_BODY_TYPE,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_EDUC_LEVEL:
					yield put({
						type    : action.LOOK_UP_SET_EDUC_LEVEL,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_ETHNICITY:
					yield put({
						type    : action.LOOK_UP_SET_ETHNICITY,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_EXER_REGIMEN:
					yield put({
						type    : action.LOOK_UP_SET_EXER_REGIMEN,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_EYE_COLOR:
					yield put({
						type    : action.LOOK_UP_SET_EYE_COLOR,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_GENDER:
					yield put({
						type    : action.LOOK_UP_SET_GENDER,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_HAIR_COLOR:
					yield put({
						type    : action.LOOK_UP_SET_HAIR_COLOR,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_HEIGHT:
					yield put({
						type    : action.LOOK_UP_SET_HEIGHT,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_KID_SITUATION:
					yield put({
						type    : action.LOOK_UP_SET_KID_SITUATION,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_PET_POLICY:
					yield put({
						type    : action.LOOK_UP_SET_PET_POLICY,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_POS_POLITICS:
					yield put({
						type    : action.LOOK_UP_SET_POS_POLITICS,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_PREF_SMOKING:
					yield put({
						type    : action.LOOK_UP_SET_PREF_SMOKING,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_PROFESSION:
					yield put({
						type    : action.LOOK_UP_SET_PROFESSION,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_RELATIONSHIP_TYPE:
					yield put({
						type    : action.LOOK_UP_SET_REL_TYPE,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_RELIG_BELIEF:
					yield put({
						type    : action.LOOK_UP_SET_RELIG_BELIEF,
						payload : res.data.lookUp
					});
					break;
				case LOOK_UP_SUBSCRIPTION_PLAN:
					yield put({
						type    : action.LOOK_UP_SET_SUB_PLAN,
						payload : res.data.subscriptionPlan
					});
					break;
			} 
		} else {
			yield put({
				type    : action.LOOK_UP_GET_FIELDS_ERROR,
				payload : res.data.status.description 
			});
		}
	} catch (error) {
		console.log(error)
		yield put({
			type    : action.LOOK_UP_GET_FIELDS_ERROR,
			payload : error 
		});
  }
}

export default function* rootSaga() {
	yield all([takeEvery(action.LOOK_UP_GET_FIELDS, reqLookUpGetFields)]);
}