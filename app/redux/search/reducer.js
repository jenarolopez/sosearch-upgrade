import action from "./action";

const initState = {
  search : {
    searchId    : 1,
    searchName  : "My Ideal",
    status      : "ACT",
    searchDetail : {
      hairColor   : [],
      eyeColor    : [],
      rating      : [],
      heart       : [],
      bodyType    : [],
      kidPolicy   : [],
      educLevel   : [],
      ethnicity   : [],
      religBelief : [],
      exerRegimen : [],
      // incomeLevel : [],
      prefAlcohol : [],
      prefSmoking : [],
      posPolitics : []
    }
  },
  searchList          : [],
  searchResult        : [],
  isSearchListLoaded  : false,
  isSearchListLoading : false,
  isMyIdealLoaded     : false,
  isMyIdealFetching   : false,
  isDeleted   : false,
  isDeleting  : false,
  isAdded     : false,
  isAdding    : false,

  isUpdatingSearch    : false,
};

export default function searchReducer(state = initState, act) {
  switch (act.type) {

    case action.SEARCH_GET_MY_IDEAL:
      console.log("redux/search/reducer.js:SEARCH_GET_MY_IDEAL");
      return {
        ...state,
        isMyIdealLoaded   : false,
        isMyIdealFetching : true
      }
    case action.SEARCH_GET_MY_IDEAL_SUCCESS:
      console.log("redux/search/reducer.js:SEARCH_GET_MY_IDEAL_SUCCESS");
      return {
        ...state,
        search            : act.payload.search,
        searchList        : act.payload.searches,
        isMyIdealLoaded   : true,
        isMyIdealFetching : false,
      }
    case action.SEARCH_GET_MY_IDEAL_ERROR:
      console.log("redux/search/reducer.js:SEARCH_GET_MY_IDEAL_ERROR");
      return {
        ...state,
        isMyIdealFetching : false
      }
    case action.SEARCH_GET_ALL:
      console.log("redux/search/reducer.js:SEARCH_GET_ALL");
      return {
        ...state,
        isSearchListLoading : true
      }
    case action.SEARCH_GET_ALL_SUCCESS:
      console.log("redux/search/reducer.js:SEARCH_GET_ALL_SUCCESS");
      return {
        ...state,
        searchList          : act.payload,
        isSearchListLoaded  : true,
        isSearchListLoading : false,
      }
    case action.SEARCH_GET_ALL_ERROR:
      console.log("redux/search/reducer.js:SEARCH_GET_ALL_ERROR");
      return {
        ...state,
        isSearchListLoading : false
      }
    case action.SEARCH_ADD:
      console.log("redux/search/reducer.js:SEARCH_ADD");
      return {
        ...state,
        isAdded : false,
        isAdding : true,
      }
    case action.SEARCH_ADD_SUCCESS:
      console.log("redux/search/reducer.js:SEARCH_ADD_SUCCESS");
      return {
        ...state,
        isAdded     : true,
        isAdding    : false,
        searchList  :  [...state.searchList, act.payload],
        search      :  act.payload
      }
    case action.SEARCH_ADD_ERROR:
      console.log("redux/search/reducer.js:SEARCH_ADD_ERROR");
      return {
        ...state,
        isAdding  : false,
      }
    case action.SEARCH_GET:
      console.log("redux/search/reducer.js:SEARCH_GET");
      return {
        ...state,
        search :  act.payload
      }
    case action.SEARCH_UPDATE:
      console.log("redux/search/reducer.js:SEARCH_UPDATE");

      return {
        ...state,
        search      : act.payload,
        searchList  : state.searchList.map(search => {
          let newSearch = search;
          if (search.searchId === act.payload.searchId) {
            newSearch = act.payload;
          }

          return newSearch;
        })
      }
    case action.SEARCH_DELETE:
      console.log("redux/search/reducer.js:SEARCH_DELETE");
      console.log(act.payload)
      return {
        ...state,
        isDeleted   : false,
        isDeleting  : true,
      }
    case action.SEARCH_DELETE_SUCCESS:
      console.log("redux/search/reducer.js:SEARCH_DELETE_SUCCESS");
      console.log(act.payload)
      return {
        ...state,
        isDeleted   : true,
        isDeleting  : false,
        searchList  : state.searchList.filter(search => search.searchId !== act.payload),
      }
    case action.SEARCH_DELETE_ERROR:
      console.log("redux/search/reducer.js:SEARCH_DELETE_ERROR");
      return {
        ...state,
        isDeleting : false,
      }
    case action.SEARCH_UPDATE_SEARCH_LIST:
      console.log("redux/search/reducer.js:SEARCH_UPDATE_SEARCH_LIST");
      console.log(act.payload)
      return {
        ...state,
        searchList : act.payload
      }
    case action.SEARCH_SET_RESULT:
      console.log("redux/search/reducer.js:SEARCH_SET_RESULT");
      console.log(act.payload)
      return {
        ...state,
        searchResult : act.payload
      }
    default:
      return state
  }
}
