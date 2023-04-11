import action from "./action";

const initState = {
  eventList        : [],
  isEventAdded     : false,
  isEventLoading   : false
};

export default function calendarReducer(state = initState, act) {

  switch (act.type) {

    case action.CALENDAR_GET_EVENTS:
      console.log("redux/calendar/reducer.js:CALENDAR_GET_EVENTS");
      return {
        ...state,
        isEventLoading : true
      }

    case action.CALENDAR_GET_EVENTS_SUCCESS:
      console.log("redux/calendar/reducer.js:CALENDAR_GET_EVENTS_SUCCESS");
      return {
        ...state,
        eventList      : act.payload,
        isEventAdded   : false,
        isEventLoading : false
      }

    case action.CALENDAR_GET_EVENTS_ERROR:
      console.log("redux/calendar/reducer.js:CALENDAR_GET_EVENTS_ERROR");
      return {
        ...state,
        isEventLoading : false
      }

    case action.CALENDAR_ADD_EVENT:
      console.log("redux/calendar/reducer.js:CALENDAR_ADD_EVENT");

      const sortedEventList = [...state.eventList, act.payload].sort((a, b) => {
        return b.meetup.dateStart - a.meetup.dateStart;
      });

      return {
        ...state,
        eventList      : sortedEventList,
        isEventAdded   : true
      }  

    case action.CALENDAR_UPDATE_SENDER:
      console.log("redux/calendar/reducer.js:CALENDAR_UPDATE_SENDER");
      console.log("-- act.payload --");
      console.log(act.payload);

      return {
        ...state,        
        eventList       : state.eventList.map((event) => {
                            if (event.eventSender.calendarId === act.payload.calendarId) {
                              event['eventSender'] = act.payload;
                            }
                            return event
                          })
      }

    case action.CALENDAR_UPDATE_RECEIVER:
      console.log("redux/calendar/reducer.js:CALENDAR_UPDATE_RECEIVER");
      console.log("-- act.payload --");
      console.log(act.payload);

      return {
        ...state,        
        eventList       : state.eventList.map((event) => {
                            if (event.eventReceiver.calendarId === act.payload.calendarId) {
                              event['eventReceiver'] = act.payload;
                            }
                            return event;
                          })
      }

    case action.CALENDAR_UPDATE_MEETUP:
      console.log("redux/calendar/reducer.js:CALENDAR_UPDATE_MEETUP");
      console.log("-- act.payload --");
      console.log(act.payload);

      return {
        ...state,        
        eventList        : state.eventList.map((event) => {
                              if (event.meetup.meetupId === act.payload.meetupId) {
                                event['meetup'] = act.payload;
                              } 
                              return event
                           })
      }

    case action.CALENDAR_DELETE_EVENT:
      console.log("redux/calendar/reducer.js:CALENDAR_DELETE_EVENT");
      console.log("-- act.payload --");
      console.log(act.payload);

      return {
        ...state,
        eventList        : state.eventList.filter(eventListItem => eventListItem.meetup.meetupId !== act.payload)
      }  

    default:
      return state
  }
}
