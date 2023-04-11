const action = {

  CONVERSATIONS_SAVE          : "CONVERSATIONS_SAVE",
  CONVERSATIONS_GET           : "CONVERSATIONS_GET",
  CONVERSATION_ADD            : "CONVERSATION_ADD",
  CONVERSATION_SEEN_UPDATE    : "CONVERSATION_SEEN_UPDATE",
  UPDATE_CONVERSATIONS        : "UPDATE_CONVERSATIONS",
  MESSAGES_SAVE               : "MESSAGES_SAVE",
  MESSAGE_FETCH               : "MESSAGE_FETCH",
  MESSAGES_UPDATE             : "MESSAGES_UPDATE",
  TWILIO_CONVERSATIONS_SAVE   : "TWILIO_CONVERSATIONS_SAVE",
  TWILIO_UPDATE               : "TWILIO_UPDATE",
  TWILIO_UPDATE_SUCCESS       : "TWILIO_UPDATE_SUCCESS",
  USER_REACHABILITY_UPDATE    : "USER_REACHABILITY_UPDATE",
  GET_USER_STATUS             : "GET_USER_STATUS",
  SAVE_USER_PROMISES          : "SAVE_USER_PROMISES",
  USER_ATTRIBUTE_UPDATE       : "USER_ATTRIBUTE_UPDATE",
  SAVE_CONVERSATION_MESSAGES  : "SAVE_CONVERSATION_MESSAGES",
  ADD_ONE_CONVERSATION        : "ADD_ONE_CONVERSATION",
  
  getConversationRequest : conversations => ({
    type    : action.CONVERSATIONS_GET,
    payload : conversations
  }),

  saveConversations: conversations => ({
    type    : action.CONVERSATIONS_SAVE,
    payload : conversations
  }),

  fetchMessage: messageList => ({
    type    : action.MESSAGE_FETCH,
    payload : messageList
  }),

  saveMessageList: messageList => ({
    type    : action.MESSAGES_SAVE,
    payload : messageList
  }),

  addConversation: conversation => ({
    type    : action.CONVERSATION_ADD,
    payload : conversation
  }),

  updateMessageList: message => ({
    type    : action.MESSAGES_UPDATE,
    payload : message
  }),

  updateTwilio: twilio => ({
    type    : action.TWILIO_UPDATE,
    payload : twilio
  }),

  updateReachabilityStatus: user => ({
    type    : action.USER_REACHABILITY_UPDATE,
    payload : user
  }),

  addSingleConversation: conversation => ({
    type    : action.ADD_ONE_CONVERSATION,
    payload : conversation
  }),

  updateConversation: payload => ({
    type    : action.UPDATE_CONVERSATIONS,
    payload 
  })


};

export default action;
