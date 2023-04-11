import action from "./action";

const initState = {
  callLogs: [],
  callPage: {
    currentPage: 1,
    hasNextPage: false,
  },
  isCallLogsLoaded: false,
  isCallLogsLoading: false,
};


export default function callReducer(state = initState, act) {
  switch (act.type) {

    case action.CALL_GET:
      console.log("redux/call/reducer.js:CALL_GET");
      return {
        ...state,
        isCallLogsLoading: true,
      };

    case action.CALL_GET_SUCCESS:
      console.log("redux/call/reducer.js:CALL_GET_SUCCESS");
      const { data } = act.payload;

      let callLogList = [];
      if (data.page == 1) {
        callLogList = data.callLogs;
      } else {
        callLogList = [...state.callLogs, ...data.callLogs];
      }

      return {
        ...state,
        callLogs: callLogList,
        isCallLogsLoaded: true,
        isCallLogsLoading: false,
        callPage: {
          currentPage: data.page,
          hasNextPage: data.hasNextPage,
        },
      };


    case action.CALL_GET_ERROR:
      console.log("redux/call/reducer.js:CALL_GET_ERROR");
      return {
        ...state,
        isCallLogsLoading: false,
      };

  

    default:
      return state;
  }
}
