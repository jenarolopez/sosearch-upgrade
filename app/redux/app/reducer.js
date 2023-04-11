import action from "./action";

const initState = {
  isOpened   : false,
  appVersion : '',
};

export default function appReducer(state = initState, act){
  switch(act.type){

    case action.START_ANIMATION:
      return { 
        ...state,
        isOpened : true
      };

    case action.UPDATE_VERSION_NUMBER:
      console.log('action.UPDATE_VERSION_NUMBER act: ', act);
      return {
        ...state,
        appVersion: act.payload,
        test: 'test'
      }


    default:
      return state
  }
}
