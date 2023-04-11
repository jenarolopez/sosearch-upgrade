const action = {

  START_ANIMATION       : "START_ANIMATION",
  UPDATE_VERSION_NUMBER : "UPDATE_VERSION_NUMBER",

  updateVersionNumber: (versionNumber) => ({
    type    : action.UPDATE_VERSION_NUMBER,
    payload : versionNumber
  }),
    
  startAnimation: isOpened => ({
    type    : action.START_ANIMATION,
    payload : isOpened
  }),
}

export default action;