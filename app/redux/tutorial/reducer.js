import action from "./action";

const initState = {
  tutorial: {
    isCalendarTutorialDone      : false,
    isMessageCenterTutorialDone : false,
    isNearMeTutorialDone        : false,
    isRecentViewsTutorialDone   : false,
    isShortlistTutorialDone     : false,
    isSearchTutorialDone        : false,
    isUserProfileTutorialDone   : false,
  }
};

export default function userReducer(state = initState, act) {

  switch (act.type) {
    case action.VIEW_CALENDAR_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_CALENDAR_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isCalendarTutorialDone : act.payload
        }
      }

    case action.VIEW_MESSAGE_CENTER_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_MESSAGE_CENTER_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isMessageCenterTutorialDone : act.payload
        }
      }

    case action.VIEW_NEAR_ME_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_NEAR_ME_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isNearMeTutorialDone : act.payload
        }
      }

    case action.VIEW_RECENT_VIEWS_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_RECENT_VIEWS_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isRecentViewsTutorialDone : act.payload
        }
      }

    case action.VIEW_SEARCH_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_SEARCH_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isSearchTutorialDone : act.payload
        }
      }

    case action.VIEW_SHORTLIST_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_SHORTLIST_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isShortlistTutorialDone : act.payload
        }
      }

    case action.VIEW_USER_PROFILE_TUTORIAL:
      console.log("redux/tutorial/reducer.js:VIEW_USER_PROFILE_TUTORIAL");
      
      return {
        ...state,
        tutorial : {
          ...state.tutorial,
          isUserProfileTutorialDone : act.payload
        }
      }
    default:
      return state
  }
}
