const action = {

    VIEW_CALENDAR_TUTORIAL        : "VIEW_CALENDAR_TUTORIAL",
    VIEW_MESSAGE_CENTER_TUTORIAL  : "VIEW_MESSAG_ECENTER_TUTORIAL",
    VIEW_NEAR_ME_TUTORIAL         : "VIEW_NEAR_ME_TUTORIAL",
    VIEW_RECENT_VIEWS_TUTORIAL    : "VIEW_RECENT_VIEWS_TUTORIAL",
    VIEW_SEARCH_TUTORIAL          : "VIEW_SEARCH_TUTORIAL",
    VIEW_SHORTLIST_TUTORIAL       : "VIEW_SHORTLIST_TUTORIAL",
    VIEW_USER_PROFILE_TUTORIAL    : "VIEW_USER_PROFILE_TUTORIAL",

    viewCalendarTutorial: isViewed => ({
      type    : action.VIEW_CALENDAR_TUTORIAL,
      payload : isViewed
    }),

    viewMessageCenterTutorial: isViewed => ({
      type    : action.VIEW_MESSAGE_CENTER_TUTORIAL,
      payload : isViewed
    }),

    viewNearMeTutorial: isViewed => ({
      type    : action.VIEW_NEAR_ME_TUTORIAL,
      payload : isViewed
    }),

    viewRecentViewsTutorial: isViewed => ({
      type    : action.VIEW_RECENT_VIEWS_TUTORIAL,
      payload : isViewed
    }),

    viewSearchTutorial: isViewed => ({
      type    : action.VIEW_SEARCH_TUTORIAL,
      payload : isViewed
    }),

    viewShortlistTutorial: isViewed => ({
      type    : action.VIEW_SHORTLIST_TUTORIAL,
      payload : isViewed
    }),

    viewUserProfileTutorial: isViewed => ({
      type    : action.VIEW_USER_PROFILE_TUTORIAL,
      payload : isViewed
    }),
  };
  
  export default action;
  