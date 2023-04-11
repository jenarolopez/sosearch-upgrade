const action = {


  CALL_GET                       : "CALL_GET",
  CALL_GET_SUCCESS               : "CALL_GET_SUCCESS",
  CALL_GET_ERROR                 : "CALL_GET_ERROR",


  getCallLogs: payload => ({
    type    : action.CALL_GET,
    payload : payload
  }),

};

export default action;
