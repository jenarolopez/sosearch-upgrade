import PushNotification from 'react-native-push-notification';
import action from "./action";

const initState = {
  notification                        : {},
  notificationList                    : [],
  notificationPage                    : {
                                          currentPage: 1,
                                          hasNextPage: false
                                        },
  badgeCount                          : {
                                          calendar     : 0,
                                          chat         : 0, 
                                          nearMe       : 0,
                                          notification : 0,
                                          recentViews  : 0,
                                          search       : 0
                                        },
  isNotificationLoaded                : false,
  isNotificationLoading               : false,
  isMarkingNotificationReadInProgress : false,
};

const setNotificationBadge = ({ calendar, chat, nearMe, notification, recentViews, search }) => {
  const totalBadgeCount = calendar + chat + nearMe + notification + recentViews + search
  PushNotification.setApplicationIconBadgeNumber(totalBadgeCount);
}

export default function notificationReducer(state = initState, act) {

  switch (act.type) {

    case action.NOTIFICATION_UNSEEN_COUNT: 
      console.log("redux/notification/reducer.js:NOTIFICATION_UNSEEN_COUNT");

      return {
        ...state
      }

    case action.NOTIFICATION_GET:
      console.log("redux/notification/reducer.js:NOTIFICATION_GET");
    
      return {
        ...state,
        isNotificationLoading : true
      }

    case action.NOTIFICATION_GET_SUCCESS:
      console.log("redux/notification/reducer.js:NOTIFICATION_GET_SUCCESS");
      console.log("redux/notification/reducer.js:NOTIFICATION_GET_SUCCESS",act.payload);

      const { data } = act.payload
      const updatedNotificationBadge = { ...state.badgeCount, notification : act.payload.notificationCount };
      setNotificationBadge(updatedNotificationBadge);
      
      let newNotificationList = []
      if(data.page == 1){
        newNotificationList = data.notification;
      } else {
        newNotificationList = [...state.notificationList, ...data.notification];
      }
      


      return {
        ...state,
        notificationList      : newNotificationList,
        badgeCount            : updatedNotificationBadge,
        isNotificationLoaded  : true,
        isNotificationLoading : false,
        notificationPage  : {
          currentPage: data.page,
          hasNextPage: data.hasNextPage
        }

      }

    case action.NOTIFICATION_UPDATE:
      console.log("redux/notification/reducer.js:NOTIFICATION_UPDATE");
      
      const updatedNotifBadge = { ...state.badgeCount, notification : act.payload };
      setNotificationBadge(updatedNotifBadge);

      return {
        ...state,
        badgeCount             : updatedNotifBadge
      }
    
    case action.NOTIFICATION_GET_ERROR:
      console.log("redux/notification/reducer.js:NOTIFICATION_GET_ERROR");
      return {
        ...state,
        isNotificationLoading : false
      }

    case action.NOTIFICATION_SEEN_SUCCESS:
      console.log("redux/notification/reducer.js:NOTIFICATION_SEEN_SUCCESS");

      const updatedSeenNotificationBadge = { ...state.badgeCount, notification : state.badgeCount.notification - 1 };
      setNotificationBadge(updatedSeenNotificationBadge);

      return {
        ...state,
        notificationList      : state.notificationList.map((notificationListItem) => {
          if (notificationListItem.notifId != act.payload.notifId) {
            return notificationListItem
          } else {
            return act.payload
          }
        }),
        badgeCount             : updatedSeenNotificationBadge
      }

    case action.NOTIFICATION_SEARCH_UPDATE:
      console.log("redux/notification/reducer.js:NOTIFICATION_SEARCH_UPDATE");
      
      const updatedSearchNotifBadge = { ...state.badgeCount, search : act.payload };
      setNotificationBadge(updatedSearchNotifBadge);

      return {
        ...state,
        badgeCount             : updatedSearchNotifBadge
      }

      case action.NOTIFICATION_RECENT_VIEWS_UPDATE:
      console.log("redux/notification/reducer.js:NOTIFICATION_RECENT_VIEWS_UPDATE");
      
      const updatedViewsNotifBadge = { ...state.badgeCount, recentViews : act.payload };
      setNotificationBadge(updatedViewsNotifBadge);

      return {
        ...state,
        badgeCount             : updatedViewsNotifBadge
      }

    case action.NOTIFICATION_RECENT_VIEWS_SEEN:
      console.log("redux/notification/reducer.js:NOTIFICATION_RECENT_VIEWS_SEEN");

      const updatedSeenViewsNotifBadge = { ...state.badgeCount, recentViews : state.badgeCount.recentViews - 1 };
      setNotificationBadge(updatedSeenViewsNotifBadge);

      return {
        ...state,
        badgeCount             : updatedSeenViewsNotifBadge
      }

      case action.NOTIFICATION_CALENDAR_UPDATE:
      console.log("redux/notification/reducer.js:NOTIFICATION_CALENDAR_UPDATE");

      const updatedCalendarNotifBadge = { ...state.badgeCount, calendar : act.payload };
      setNotificationBadge(updatedCalendarNotifBadge);

      return {
        ...state,
        badgeCount             : updatedCalendarNotifBadge
      }

    case action.NOTIFICATION_CALENDAR_SEEN_SUCCESS:
      console.log("redux/notification/reducer.js:NOTIFICATION_CALENDAR_SEEN_SUCCESS");

      const updatedSeenCalendarNotifBadge = { ...state.badgeCount, calendar : state.badgeCount.calendar - 1 };
      setNotificationBadge(updatedSeenCalendarNotifBadge);

      return {
        ...state,
        badgeCount             : updatedSeenCalendarNotifBadge
      }

    case action.NOTIFICATION_CHAT_UPDATE:
      console.log("redux/notification/reducer.js:NOTIFICATION_CHAT_UPDATE");

      const updatedChatNotifBadge = { ...state.badgeCount, chat : act.payload };
      setNotificationBadge(updatedChatNotifBadge);

      return {
        ...state,
        badgeCount             : updatedChatNotifBadge
      }

    case action.NOTIFICATION_CHAT_SEEN_SUCCESS:
      console.log("redux/notification/reducer.js:NOTIFICATION_CHAT_SEEN_SUCCESS");

      const updatedSeenChatNotifBadge = { ...state.badgeCount, chat : state.badgeCount.chat - 1 };
      setNotificationBadge(updatedSeenChatNotifBadge);

      return {
        ...state,
        badgeCount             : updatedSeenChatNotifBadge
      }

    case action.NOTIFICATION_MARK_ALL_SUCCESS:
      console.log("redux/notification/reducer.js:NOTIFICATION_MARK_ALL_SUCCESS");
      const notificationList = state.notificationList.map( notification => {
        return {
          ...notification,
          isSeen: 1
        }
      })
      const notificationBadge = { ...state.badgeCount, notification: 0 }
      setNotificationBadge(notificationBadge);

      return {
        ...state,
        notificationList,
        badgeCount: notificationBadge
      }

    case action.NOTIFICATION_SAVE:
      console.log("redux/notification/reducer.js:NOTIFICATION_SAVE");
      return {
        ...state,
        notification                        : act.payload
      }

    case action.NOTIFICATION_SETTINGS_SAVE:
      console.log("redux/notification/reducer.js:NOTIFICATION_SETTINGS_SAVE");
      return {
        ...state,
        notificationSettings                : act.payload
      }

    default:
      return state
  }
}
