import { Client } from '@twilio/conversations';
import action     from '../redux/message/action';
import { store }  from '../../index';

/////////////////////////
// createChatClient()
/////////////////////////
export const createChatClient = async (tokenTwilio) => {
  console.log('util/twilio/createChatClient');
  console.log('tokenTwilio : ', tokenTwilio);

  return await Client.create(tokenTwilio);
}

/////////////////////////
// getConversations()
/////////////////////////
export const getConversations = async (client) => {
  console.log('util/twilio/getConversations');
  console.log('client : ', client);

  return await client.getSubscribedConversations();
}

/////////////////////////
// joinConversation()
/////////////////////////
export const joinConversation = (conversation) => {
  console.log('util/twilio/joinConversation');
  console.log('conversation : ', conversation);
  
  if (conversation.channelState.status !== "joined") conversation.join();
}

/////////////////////////
// listenToConversation()
/////////////////////////
export const listenToConversation = (conversation) => {
  console.log('util/twilio/listenToConversation');
  console.log('conversation : ', conversation);
  conversation.removeListener('messageAdded', handleMessageAdded);
  conversation.on('messageAdded', handleMessageAdded)
}


function handleMessageAdded (message) {
  store.dispatch({
    type    : action.MESSAGES_UPDATE,
    payload : message
  })
}