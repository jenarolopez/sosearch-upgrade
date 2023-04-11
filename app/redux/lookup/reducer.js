import action from "./action";

const initState = {
  lookUpBodyType        : [],
  lookUpEducLevel       : [],
  lookUpEthnicity       : [],
  lookUpExerRegimen     : [],
  lookUpEyeColor        : [],
  lookUpGender          : [],
  lookUpHairColor       : [],
  lookUpHeart           : [],
  lookUpHeight          : [],
  lookUpHobbyCode       : [],
  // lookUpIncomeLevel     : [],
  lookUpIssueCateg      : [],
  lookUpKidPolicy       : [],
  lookUpKidSituation    : [],
  lookUpLanguage        : [],
  lookUpMembershipLevel : [],
  lookUpPetPolicy       : [],
  lookUpPosPolitics     : [],
  lookUpPrefAlcohol     : [],
  lookUpPrefSmoking     : [],
  lookUpProfession      : [],
  lookUpRating          : [],
  lookUpRelType         : [],
  lookUpReligBelief     : [],
  lookUpSubscriptionPlan: [],
  isLoading 	          : false
};    

export default function lookupReducer(state = initState, act) {
  switch (act.type) {

    // temporary filter/remove "no rating" from lookup rating
    case action.LOOKUP_FILTER_FIELDS: 
      console.log('action.LOOKUP_FILTER_FIELDS')
      return {
        ...state,
        lookUpRating: state.lookUpRating.filter(function(e) { return e.code != '0.0'; })
      }
      
    case action.LOOK_UP_GET_FIELDS:
      console.log("redux/lookup/reducer.js:LOOK_UP_GET_FIELDS");
      console.log(act.payload)
      return {
        ...state,
        isLoading : true
      }

		case action.LOOK_UP_SET_HAIR_COLOR:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_HAIR_COLOR");
      console.log(act.payload)
      return {
        ...state,
        lookUpHairColor : act.payload,
        isLoading       : false
      }
    
    case action.LOOK_UP_SET_EYE_COLOR:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_EYE_COLOR");
      console.log(act.payload)
      return {
        ...state,
        lookUpEyeColor : act.payload,
        isLoading      : false
      }
    
    case action.LOOK_UP_SET_REL_TYPE:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_REL_TYPE");
      console.log(act.payload)
      return {
        ...state,
        lookUpRelType : act.payload,
        isLoading     : false
      }
    
    case action.LOOK_UP_SET_GENDER:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_GENDER");
      console.log(act.payload)
      return {
        ...state,
        lookUpGender  : act.payload,
        isLoading     : false
      }

    case action.LOOK_UP_SET_RELIG_BELIEF:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_RELIG_BELIEF");
      console.log(act.payload)
      return {
        ...state,
        lookUpReligBelief : act.payload,
        isLoading         : false
      }
    
    case action.LOOK_UP_SET_HEIGHT:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_HEIGHT");
      console.log(act.payload)
      return {
        ...state,
        lookUpHeight  : act.payload,
        isLoading     : false
      }

    case action.LOOK_UP_SET_BODY_TYPE:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_BODY_TYPE");
      console.log(act.payload)
      return {
        ...state,
        lookUpBodyType  : act.payload,
        isLoading       : false
      }

    case action.LOOK_UP_SET_KID_SITUATION:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_KID_SITUATION");
      console.log(act.payload)
      return {
        ...state,
        lookUpKidSituation  : act.payload,
        isLoading           : false
      }

    case action.LOOK_UP_SET_EDUC_LEVEL:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_EDUC_LEVEL");
      console.log(act.payload)
      return {
        ...state,
        lookUpEducLevel : act.payload,
        isLoading       : false
      }

    case action.LOOK_UP_SET_PREF_ALCOHOL:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_PREF_ALCOHOL");
      console.log(act.payload)
      return {
        ...state,
        lookUpPrefAlcohol : act.payload,
        isLoading         : false
      }

    case action.LOOK_UP_SET_PREF_SMOKING:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_PREF_SMOKING");
      console.log(act.payload)
      return {
        ...state,
        lookUpPrefSmoking : act.payload,
        isLoading         : false
      }

    case action.LOOK_UP_SET_ETHNICITY:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_ETHNICITY");
      console.log(act.payload)
      return {
        ...state,
        lookUpEthnicity : act.payload,
        isLoading       : false
      }
    
    case action.LOOK_UP_SET_PET_POLICY:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_PET_POLICY");
      console.log(act.payload)
      return {
        ...state,
        lookUpPetPolicy : act.payload,
        isLoading       : false
      }
    
    case action.LOOK_UP_SET_POS_POLITICS:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_POS_POLITICS");
      console.log(act.payload)
      return {
        ...state,
        lookUpPosPolitics : act.payload,
        isLoading         : false
      }
    
    case action.LOOK_UP_SET_PROFESSION:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_PROFESSION");
      console.log(act.payload)
      return {
        ...state,
        lookUpProfession : act.payload,
        isLoading         : false
      }

    case action.LOOK_UP_SET_EXER_REGIMEN:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_EXER_REGIMEN");
      console.log(act.payload)
      return {
        ...state,
        lookUpExerRegimen : act.payload,
        isLoading         : false
      }

    case action.LOOK_UP_SET_HOBBY_CODE:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_HOBBY_CODE");
      console.log(act.payload)
      return {
        ...state,
        lookUpHobbyCode : act.payload,
        isLoading       : false
			}

		case action.LOOK_UP_SET_RATING:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_RATING");
      console.log(act.payload)
      return {
        ...state,
        lookUpRating      : act.payload,
        isLoading         : false
			}

		case action.LOOK_UP_SET_HEART:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_HEART");
      console.log(act.payload)
      return {
        ...state,
        lookUpHeart       : act.payload,
        isLoading         : false
			}

		case action.LOOK_UP_SET_KID_POLICY:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_KID_POLICY");
      console.log(act.payload)
      return {
        ...state,
        lookUpKidPolicy   : act.payload,
        isLoading         : false
      }
      
    // case action.LOOK_UP_SET_INCOME_lEVEL:
    //   console.log("redux/lookup/reducer.js:LOOK_UP_SET_INCOME_lEVEL");
    //   console.log(act.payload)
    //   return {
    //     ...state,
    //     lookUpIncomeLevel : act.payload,
    //     isLoading         : false
		// 	}

		case action.LOOK_UP_SET_ISSUE_CATEG:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_ISSUE_CATEG");
      console.log(act.payload)
      return {
        ...state,
        lookUpIssueCateg  : act.payload,
        isLoading         : false
			}
		
		case action.LOOK_UP_SET_LANGUAGE:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_LANGUAGE");
      console.log(act.payload)
      return {
        ...state,
        lookUpLanguage    : act.payload,
        isLoading         : false
      }
      
    case action.LOOK_UP_SET_SUB_PLAN:
      console.log("redux/lookup/reducer.js:LOOK_UP_SET_SUB_PLAN");
      console.log(act.payload)
      return {
        ...state,
        lookUpSubscriptionPlan : act.payload,
        isLoading              : false
			}
		
		default:
      return state
  }
}