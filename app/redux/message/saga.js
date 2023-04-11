import { all, takeEvery, put, select, takeLatest, call } from 'redux-saga/effects';
import action from './action';
import { userRequest, connectionRequest } from '../../request/request';
import actionConnection from '../connection/action';
import { createChatClient, getConversations } from '../../utils/twilio';
import { HTTP_STATUS }  from '../../constants/Constants';
import { handleHttpError } from '../../utils/helper';
import { Platform } from 'react-native';

const isIOS = Platform.OS == 'ios';


/////////////////////////
// reqInitTwilioChat()
/////////////////////////
function* reqInitTwilioChat({ payload }) {
  try {
    console.log('reqInitTwilioChat() payload: ', payload);

    const getUser = state => state.User;
    const user = yield select(getUser);
    const notificationInfo = user.notification;
    const res = yield userRequest.getTwilioChatToken({
      user_id      : payload.user.userId,
      channel_type : payload.platform
    });

    yield put({
      type : actionConnection.CONNECTION_GET_RECENT_VIEWS
    });

    console.log('res');
    console.log(res);

    if (res) {
      const accessToken = res.data.tokenTwilio.token;
      const resChatClient = yield createChatClient(accessToken);
      const twilioClient = resChatClient;

      yield put({
        type    : action.TWILIO_UPDATE_SUCCESS,
        payload : twilioClient
      });
  
      if (notificationInfo.notificationChannel.channelType != '' && notificationInfo.notificationChannel.deviceToken != '') {
        twilioClient.setPushRegistrationId(
          notificationInfo.notificationChannel.channelType, 
          notificationInfo.notificationChannel.deviceToken
        ).catch(error => handleHttpError(error, 'redux/message/saga twilioClient.setPushRegistrationId'));
      }
    }
  } catch (error) {
    console.log('exception()');
    console.log(error);
  }
}

// const getContact = (userInfo, value , payload) => {
//   const { likedMe, iViewed, viewedMe } = payload;

//   let contact = [...iViewed, ...likedMe.map(user => user.userConnection), ...viewedMe].find(connection => connection.user[userInfo] == value);

//   return contact; 
// }

//   /////////////////////////////
//   // getAllConversationMessages()
//   /////////////////////////////
//   function* getAllConversationMessages(conversations, payload) {
//     try{
//       const { user } = payload;
//       const conversationsArr  = [];
  
//       for (x = 0; x<conversations.length; x++) {
//         if (conversations[x].channelState.status === 'notParticipating') continue;
        
//         const messages       = yield conversations[x].getMessages();
//         const messagesLength = messages.items.length;
  
//         if (messagesLength === 0) continue;
//         const conversationUniqueNameArr = conversations[x].channelState.uniqueName.split('_');
//         const participants              = yield conversations[x].getParticipants();
//         const lastConsumedMessageIndex  = conversations[x].channelState.lastMessage.index;
//         const latestMessage             = messages.items[messagesLength - 1];
//         const participantId             = (user.userId > parseInt(conversationUniqueNameArr[1])) ? parseInt(conversationUniqueNameArr[1]) : parseInt(conversationUniqueNameArr[2]);
//         const participant               = participants.find(participantItem => parseInt(participantItem.state.identity) !== user.userId);
//         let   participantInfo           = {};
  
//         const latestMessageContent     = latestMessage.state.author != user.userId ? latestMessage.state.body : `You: ${latestMessage.state.body}`
//         let userConnection             = getContact('userId', user.userId, payload);
//         console.log('userConnection : ', userConnection);
  
//         if (userConnection === undefined) {
//           let response = yield connectionRequest.getConnection({ user_id : user.userId }, participantId );
  
//           console.log('connectionRequest.getConnection response: ', response)
//           userConnection = response?.data?.connection
//         }
  
//         if (participant) {
//           participantInfo = yield participant.getUser();
//         }
  
//         const conversationItem = {
//           conversationName            : conversations[x].channelState.uniqueName,
//           profilePicture              : userConnection?.user?.mediaProfile, 
//           userName                    : userConnection?.user?.userName, 
//           time                        : latestMessage?.state?.timestamp,
//           isOnline                    : participant ? (participantInfo?.state?.online ? (participantInfo?.state?.attributes?.is_reachable === false ? false : true) : false) : false,
//           isUnseen                    : latestMessage?.state?.index != lastConsumedMessageIndex && (latestMessage?.state?.author == 'friend' || latestMessage?.state?.author == participantId),
//           membershipViewabilityStatus : userConnection?.userSubscription?.viewabilityStatus,
//           messages                    : messages?.items,
//           userConnection,
//           latestMessageContent
//         };
  
//         conversationsArr.push(conversationItem);
//       }
  
//       conversationsArr.sort((a, b) => {
//         return b.time - a.time;
//       });
  
//       return conversationsArr;
//     }catch(e){
//       console.log('getAllConversationMessages error: ', e.message)
//     }
//   }

function* getAllConversations({ payload }) {
  try{
    const getMessage = state => state.Message;
    const getUser = state => state.User;
    const message = yield select(getMessage);
    const user = yield select(getUser);
    const userId = user?.user?.userId;
    const regex = new RegExp(`CHANNEL|_|${userId}`, 'g')
    const connectionUsers = {}
    const {  isChatLoaded, conversations: messageConversations } = message

    const platform = isIOS ? 'apn' : 'fcm';

    const res = yield userRequest.getTwilioChatToken({
      user_id      : userId,
      channel_type : platform
    });
    const accessToken = res.data.tokenTwilio.token;
    const resChatClient = yield createChatClient(accessToken);
    const twilioClient = resChatClient;

    
    if (twilioClient != null) {
      const conversations = yield getConversations(twilioClient);
      yield put({
        type    : action.TWILIO_CONVERSATIONS_SAVE,
        payload : conversations
      })
      if (conversations) {
        if (conversations?.items?.length === 0){
          yield put({
            type    : action.CONVERSATIONS_SAVE,
            payload : {}
          })
          return;
        } 
    
        const connectionIds = conversations.items.map(conversation => {
          const participantUser = conversation?.channelState?.uniqueName.toString() || ''
          return participantUser.replace(regex, '')
        })
        const userIdsParam = connectionIds.join(',')
        const connectionResponse = yield connectionRequest.usersProfile({
          connection_user_ids: userIdsParam,
          user_id: userId
        })

        const conversationsPayload = {}
        const conversationPromises = []
        const participantAttributePromises = []
        const noMessagePayload = {
          isUnseen: false,
          messageFrom: '',
          message: '',
          loaded: false,
          state: {}
        }
        const conversationMessagesPayload = {}

        try { 

          if(connectionResponse?.data?.status?.code != HTTP_STATUS._200){
            let { status } = response?.data;
            throw new Error(`${status?.code} ${status?.description}`);
          }

          for(let x=0; x < connectionResponse.data.userConnection.length ;x++){
            connectionUsers[connectionResponse.data.userConnection[x].user.userId] = connectionResponse.data.userConnection[x]
          }
          conversations.items.map(conversation => {
            const conversationString = conversation?.channelState?.uniqueName.toString() || ''
            const participantId = conversationString.replace(regex, '')
            let latestMessage = {}
            try{
              if(messageConversations[participantId]){
                const lastMessage = messageConversations[participantId].latestMessage
                latestMessage = lastMessage.loaded ? lastMessage : noMessagePayload 
              } else {
                latestMessage = noMessagePayload
              }
            } catch (e){
              latestMessage = noMessagePayload
            }

            let isOnline = false

            try{
              isOnline = messageConversations[participantId].isOnline
            } catch (e){
              isOnline = false
            }

            conversationsPayload[participantId] = {
              conversation,
              participantInfo: connectionUsers[participantId],
              isOnline,
              latestMessage
            }
            conversationPromises.push(conversation.getParticipants())
            conversationPromises.push(conversation.getMessages())
          })
          yield put({
            type    : action.CONVERSATIONS_SAVE,
            payload : conversationsPayload
          })

        } catch (e){
          handleHttpError(error, 'redux/message/saga::connectionRequest.usersProfile')
        }
        try {
          const promiseResponse = yield all(conversationPromises.map((promise, index) => {
            const type = index%2 == 0 ? 'user' : 'message'
            return promise.then(value => ({
                status: "fulfilled",
                value,
                type
            })).catch(reason => ({
                status: "rejected",
                reason,
                type: "fail"
            }))
          }))

          if (promiseResponse.length >= 2) {
            for(let x = 0; x < promiseResponse.length ; x++){
        
              if(promiseResponse[x].type == 'user') {
                const users = promiseResponse[x].value
                users.map(participantItem => {
                   if(participantItem?.state?.identity && participantItem?.state?.identity != userId) {
                        participantAttributePromises.push(participantItem)
                   }
                })
              }
              if(promiseResponse[x].type == 'message') {
                const messages = promiseResponse[x].value
                const messagesLength = messages.items.length;
                if(messagesLength == 0 ) continue
                const latestMessage = messages.items[messagesLength - 1];
                const conversationString =  latestMessage?.conversation?.channelState?.uniqueName.toString() || ''
                const participantId = conversationString.replace(regex, '')
                conversationMessagesPayload[participantId] = messages
                const isUnseen = (latestMessage?.conversation?.channelState?.lastReadMessageIndex < latestMessage?.conversation?.channelState.lastMessage?.index) || false
                const messagePayload = {
                    latestMessage: {
                      isUnseen,
                      isFromSelf: latestMessage.state.author != participantId,
                      message: latestMessage.state.body,
                      loaded: true,
                      state: latestMessage
                    }
                }
                yield put({
                  type    : action.UPDATE_CONVERSATIONS,
                  payload : {
                    data: messagePayload,
                    participantId
                  }
                })
              }
            }
            yield put({
              type: action.GET_USER_STATUS,
              payload: participantAttributePromises
            })
            yield put({
              type: action.SAVE_CONVERSATION_MESSAGES,
              payload: conversationMessagesPayload
            })
          }
        } catch (e){
          console.log('error:', e)
          handleHttpError(e, 'redux/message/saga')
        }
      }
    }
  }catch(e){
    console.log("getAllConversations error: ", e.message)
    handleHttpError(e, 'redux/message/saga')  }
}

function* getUserStatus({ payload }) { 

  try {
    console.log('getUserStatus()')

    const userPromiseResponse = yield all(payload.map((promise, index) => {
      return promise.getUser().then(value => ({
          status: "fulfilled",
          value,
      })).catch(reason => ({
          status: "rejected",
          reason,
      }))
    }))

    for(let x = 0; x < userPromiseResponse.length ; x++){
      if(userPromiseResponse[x].status == 'fulfilled') {
        const { value: user } = userPromiseResponse[x]
        let isOnline = user?.state?.online || false
        if( isOnline == null ) {
          isOnline = false
        }
        const conversationId = user.state.identity
        const userAttributePayload = {
            conversationId,
            isOnline,
        }
        yield put({
          type: action.USER_ATTRIBUTE_UPDATE,
          payload: userAttributePayload
        })
      }
    } 

    

  } catch(e){
    console.log(e)
  }

}



export default function* rootSaga() {
  yield all([takeEvery(action.TWILIO_UPDATE, reqInitTwilioChat)]);
  yield all([takeLatest(action.CONVERSATIONS_GET, getAllConversations)]);
  yield all([takeLatest(action.GET_USER_STATUS, getUserStatus)]);
}
