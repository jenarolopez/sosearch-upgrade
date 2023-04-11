const action = {

  SEARCH_GET_MY_IDEAL         : "SEARCH_GET_MY_IDEAL",
  SEARCH_GET_MY_IDEAL_SUCCESS : "SEARCH_GET_MY_IDEAL_SUCCESS",
  SEARCH_GET_MY_IDEAL_ERROR   : "SEARCH_GET_MY_IDEAL_ERROR",
  SEARCH_GET_ALL              : "SEARCH_GET_ALL",
  SEARCH_GET_ALL_SUCCESS      : "SEARCH_GET_ALL_SUCCESS",
  SEARCH_GET_ALL_ERROR        : "SEARCH_GET_ALL_ERROR",
  SEARCH_GET                  : "SEARCH_GET",
  SEARCH_ADD                  : "SEARCH_ADD",
  SEARCH_ADD_ERROR            : "SEARCH_ADD_ERROR",
  SEARCH_ADD_SUCCESS          : "SEARCH_ADD_SUCCESS",
  SEARCH_UPDATE               : "SEARCH_UPDATE",
  SEARCH_UPDATE_CRITERIA      : "SEARCH_UPDATE_CRITERIA",
  SEARCH_DELETE               : "SEARCH_DELETE",
  SEARCH_DELETE_SUCCESS       : "SEARCH_DELETE_SUCCESS",
  SEARCH_DELETE_ERROR         : "SEARCH_DELETE_ERROR",
  SEARCH_UPDATE_SEARCH_LIST   : "SEARCH_UPDATE_SEARCH_LIST",
  SEARCH_SET_RESULT           : "SEARCH_SET_RESULT",

  getMyIdealSearch: () => ({
    type    : action.SEARCH_GET_MY_IDEAL
  }),
  getSearches: () => ({
    type    : action.SEARCH_GET_ALL
  }),
  getSearch: search => ({
    type    : action.SEARCH_GET,
    payload : search
  }),
  addSearch: (search) => ({
    type    : action.SEARCH_ADD,
    payload : search
  }),
  updateSearchCriteria: (search) => ({
    type    : action.SEARCH_UPDATE_CRITERIA,
    payload : search
  }),
  updateSearch: search => ({
    type    : action.SEARCH_UPDATE,
    payload : search
  }),
  deleteSearch: searchId => ({
    type    : action.SEARCH_DELETE,
    payload : searchId
  }),
  updateSearchList: searchList => ({
    type    : action.SEARCH_UPDATE_SEARCH_LIST,
    payload : searchList
  }),
  setSearchResult: searchResult => ({
    type    : action.SEARCH_SET_RESULT,
    payload : searchResult
  }),
};

export default action;
