import action from "./action";

const initState = {
  isLoading          : true,
  twilioClient       : null,
  conversations      : {},
  messageList        : {},
  isChatLoaded       : false,
  isChatMessageLoaded: false
};

export default function messageReducer(state = initState, act) {

  switch (act.type) {
    case action.CONVERSATIONS_GET:{
      return {
        ...state,
        isGettingChatClients: true,
        isLoading: true
      }
    }
    case action.TWILIO_UPDATE_SUCCESS:
      console.log("redux/message/reducer.js:TWILIO_UPDATE_SUCCESS");
      console.log("-- act.payload --");
      console.log(act.payload);

      return {
        ...state,
        isLoading     : false,
        twilioClient  : act.payload
      }

    case action.CONVERSATIONS_SAVE:
      console.log("redux/message/reducer.js:CONVERSATIONS_SAVE");
      console.log("-- act.payload --");
  
      return {
        ...state,
        conversations : {
          ...state.conversations,
          ...act.payload
        },
        isChatLoaded: true,
        isLoading: false
    }

    case action.TWILIO_CONVERSATIONS_SAVE:
      console.log("redux/message/reducer.js:TWILIO_CONVERSATIONS_SAVE");
      console.log("-- act.payload --");
      console.log(act.payload);
  
      return {
        ...state,
        twilioConversation: act.payload
    }

    case action.ADD_ONE_CONVERSATION:
      console.log("redux/message/reducer.js:ADD_ONE_CONVERSATION");
      console.log("-- act.payload --");
      console.log(act.payload);
      return {
        ...state,
        conversations: {
          ...state.conversations,
          ...act.payload
        },
    }

    case action.UPDATE_CONVERSATIONS:
      console.log("redux/message/reducer.js:UPDATE_CONVERSATIONS");
      console.log("-- act.payload --");
      console.log(act.payload);
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [act.payload.participantId]: {
            ...state.conversations[act.payload.participantId],
            ...act.payload.data
          }
        },
        isChatMessageLoaded: true
    }

    case action.USER_ATTRIBUTE_UPDATE:
      console.log("redux/message/reducer.js:USER_ATTRIBUTE_UPDATE");
      console.log("-- act.payload --");
      let newConversation = {}
      try {
        newConversation = {
          [act.payload.conversationId]: {
            ...state.conversations[act.payload.conversationId],
            isOnline: act.payload.isOnline
          }
        }
      }
      catch(e){
        newConversation = {}
      } 
      console.log(newConversation)
      return {
        ...state,
        conversations: {
          ...state.conversations,
          ...newConversation
        },
      }

    case action.SAVE_CONVERSATION_MESSAGES:
      console.log("redux/message/reducer.js:SAVE_CONVERSATION_MESSAGES");
      console.log("-- act.payload --");
      return {
        ...state,
        messageList: act.payload
      }

    case action.MESSAGES_UPDATE:
      console.log("redux/message/reducer.js:MESSAGES_UPDATE");
      console.log("act.payload : ", act.payload);

      try{
        const conversations = [...state.conversations];
      
        const conversationItem    = conversations?.find(conversation => conversation?.conversationName == act?.payload?.conversation?.channelState?.uniqueName)

        console.log('conversation item: ', conversationItem);
        console.log('conversations    : ', conversations);


        if (conversationItem) {
          conversationItem['isUnseen']             = (act?.payload?.conversation?.channelState?.lastReadMessageIndex != act?.payload?.conversation?.channelState?.lastMessage ? act?.payload?.conversation?.channelState?.lastMessage : 0) && (act.payload.state.author == 'friend' || parseInt(act?.payload?.state?.author) == conversationItem?.userConnection?.user?.userId);
          conversationItem['latestMessageContent'] = act?.payload?.state?.body;
          conversationItem['time']                 = act?.payload?.state?.timestamp;
        }

        let newMessages = [...state?.conversations].filter(conversation => conversation?.conversationName !== conversationItem?.conversationName)

        let updatedMessageList = [...state.messageList?.reverse(), {
          _id       : act?.payload?.state?.index,
          text      : act?.payload?.state?.body,
          createdAt : act?.payload?.state?.timestamp,
          user      : {
            _id     : parseInt(act?.payload?.state?.author),
            name    : conversationItem?.userName,
            avatar  : conversationItem?.profilePicture
          }
        }];

        return {
          ...state,
          conversations : [...newMessages, conversationItem].sort((a, b) => {
            return b.time - a.time;
          }),
          messageList   : updatedMessageList.reverse()
        }
      }catch(e){
        console.log('action.MESSAGES_UPDATE error: ', e.message)
      }
      return {
        ...state
      }

    case action.MESSAGE_FETCH:
      console.log("redux/message/reducer.js:MESSAGE_FETCH");
      console.log("-- act.payload --");
      console.log(act.payload);
      return {
        ...state,
        messageList : [...state.messageList, ...act.payload]
      }

    case action.MESSAGES_SAVE:
      console.log("redux/message/reducer.js:MESSAGES_SAVE");
      console.log("-- act.payload --");
      console.log(act.payload);
      return {
        ...state,
        messageList : act.payload.reverse()
      }

    case action.CONVERSATION_ADD:
      console.log("redux/message/reducer.js:CONVERSATION_ADD");

      const updatedConversationsList = [...state.conversations.reverse(), act.payload];
      
      return {
        ...state,
        isLoading     : false,
        conversations : updatedConversationsList.reverse()
      }

    case action.CONVERSATION_SEEN_UPDATE:
      console.log("redux/message/reducer.js:CONVERSATION_SEEN_UPDATE");
      console.log("act.payload : ", act.payload);
      return {
        ...state,
        conversations : state.conversations.map((conversation) => {
          if (conversation.conversationName == act.payload) {
            conversation['isUnseen'] = false;
          } 

          return conversation;
        })
      }

    case action.USER_REACHABILITY_UPDATE:
      console.log("redux/message/reducer.js:USER_REACHABILITY_UPDATE");
      console.log("act.payload : ", act.payload);
      return {
        ...state,
        conversations : state.conversations.map((conversation) => {
          if (conversation.userName === act.payload.userName) {
            conversation['isOnline'] = act.payload.isOnline;
          } 

          return conversation;
        })
      }

    default:
      return state
  }
}
