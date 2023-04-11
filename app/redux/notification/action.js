const action = {

  NOTIFICATION_UNSEEN_COUNT              : "NOTIFICATION_UNSEEN_COUNT",
  NOTIFICATION_UNSEEN_COUNT_SUCCESS      : "NOTIFICATION_UNSEEN_COUNT_SUCCESS",

  NOTIFICATION_GET                       : "NOTIFICATION_GET",
  NOTIFICATION_GET_SUCCESS               : "NOTIFICATION_GET_SUCCESS",
  NOTIFICATION_GET_ERROR                 : "NOTIFICATION_GET_ERROR",

  NOTIFICATION_SAVE                      : "NOTIFICATION_SAVE",

  NOTIFICATION_UPDATE                    : "NOTIFICATION_UPDATE",
  NOTIFICATION_SEEN                      : "NOTIFICATION_SEEN",
  NOTIFICATION_SEEN_SUCCESS              : "NOTIFICATION_SEEN_SUCCESS",

  NOTIFICATION_SEARCH_UPDATE             : "NOTIFICATION_SEARCH_UPDATE",

  NOTIFICATION_RECENT_VIEWS_UPDATE       : "NOTIFICATION_RECENT_VIEWS_UPDATE",
  NOTIFICATION_RECENT_VIEWS_SEEN         : "NOTIFICATION_RECENT_VIEWS_SEEN",
  NOTIFICATION_RECENT_VIEWS_SEEN_SUCCESS : "NOTIFICATION_RECENT_VIEWS_SEEN_SUCCESS",

  NOTIFICATION_CALENDAR_UPDATE           : "NOTIFICATION_CALENDAR_UPDATE",
  NOTIFICATION_CALENDAR_SEEN             : "NOTIFICATION_CALENDAR_SEEN",
  NOTIFICATION_CALENDAR_SEEN_SUCCESS     : "NOTIFICATION_CALENDAR_SEEN_SUCCESS",

  NOTIFICATION_CHAT_UPDATE               : "NOTIFICATION_CHAT_UPDATE",
  NOTIFICATION_CHAT_SEEN                 : "NOTIFICATION_CHAT_SEEN",
  NOTIFICATION_CHAT_SEEN_SUCCESS         : "NOTIFICATION_CHAT_SEEN_SUCCESS",

  NOTIFICATION_MARK_ALL_READ             : "NOTIFICATION_MARK_ALL_READ",
  NOTIFICATION_MARK_ALL_SUCCESS          : "NOTIFICATION_MARK_ALL_SUCCESS",
  NOTIFICATION_SETTINGS_SAVE             : "NOTIFICATION_SETTINGS_SAVE",

  getUnseenNotificationsCount: userId => ({
    type    : action.NOTIFICATION_UNSEEN_COUNT,
    payload : userId
  }),

  getNotifications: page => ({
    type    : action.NOTIFICATION_GET,
    payload : page
  }),

  saveNotification: notification => ({
    type    : action.NOTIFICATION_SAVE,
    payload : notification
  }),

  updateNotificationCount: notificationCount => ({
    type    : action.NOTIFICATION_UPDATE,
    payload : notificationCount
  }),

  seenNotification: notifId => ({
    type    : action.NOTIFICATION_SEEN,
    payload : notifId
  }),

  seenRecentViewsProfile: () => ({
    type    : action.NOTIFICATION_RECENT_VIEWS_SEEN
  }),

  seenCalendarEvent: calendar => ({
    type    : action.NOTIFICATION_CALENDAR_SEEN,
    payload : calendar
  }),

  updateChatCount: unseenChatCount => ({
    type    : action.NOTIFICATION_CHAT_UPDATE,
    payload : unseenChatCount
  }),

  seenChat: chat => ({
    type    : action.NOTIFICATION_CHAT_SEEN,
    payload : chat
  }),

  markAllRead: user => ({
    type    : action.NOTIFICATION_MARK_ALL_READ,
    payload : user
  }),

  saveNotificationSettings: notificationSettings => ({
    type    : action.NOTIFICATION_SETTINGS_SAVE,
    payload : notificationSettings
  })

};

export default action;
