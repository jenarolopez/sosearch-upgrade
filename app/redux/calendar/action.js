const action = {

  CALENDAR_GET_EVENTS                    : "CALENDAR_GET_EVENTS",
  CALENDAR_GET_EVENTS_SUCCESS            : "CALENDAR_GET_EVENTS_SUCCESS",
  CALENDAR_GET_EVENTS_ERROR              : "CALENDAR_GET_EVENTS_ERROR",

  CALENDAR_ADD_EVENT                     : "CALENDAR_ADD_EVENT",

  CALENDAR_UPDATE_SENDER                 : "CALENDAR_UPDATE_SENDER",
  CALENDAR_UPDATE_RECEIVER               : "CALENDAR_UPDATE_RECEIVER",
  CALENDAR_UPDATE_MEETUP                 : "CALENDAR_UPDATE_MEETUP",

  CALENDAR_DELETE_EVENT                  : "CALENDAR_DELETE_EVENT",

  getCalendarEvents: events => ({
    type    : action.CALENDAR_GET_EVENTS,
    payload : events
  }),

  addCalendarEvent: (event) => ({
    type    : action.CALENDAR_ADD_EVENT,
    payload : event
  }),

  updateSenderCalendar: calendar => ({
    type    : action.CALENDAR_UPDATE_SENDER,
    payload : calendar
  }),

  updateReceiverCalendar: calendar => ({
    type    : action.CALENDAR_UPDATE_RECEIVER,
    payload : calendar
  }),

  updateMeetup: meetup => ({
    type    : action.CALENDAR_UPDATE_MEETUP,
    payload : meetup
  }),

  deleteMeetup: meetup => ({
    type    : action.CALENDAR_DELETE_EVENT,
    payload : meetup
  })

};

export default action;
