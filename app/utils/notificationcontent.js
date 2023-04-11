import { 
	AUDIO_CALL_DIALLED,
	AUDIO_CALL_MISSED,
	BLOCKLIST_ADDED,
	BLOCKLIST_REMOVED,
	CALENDAR_INVITE_ACCEPTED,
	CALENDAR_INVITE_DECLINED,
	CALENDAR_INVITE_RECEIVED,
	CALENDAR_INVITE_SENT,
	CALENDAR_INVITE_UPDATED,
	HEART_ACCEPTED,
	HEART_RECEIVED,
	HEART_SENT,
	HEART_UNLIKED,
	HEART_REMOVED,
	MESSAGE_REQUEST_ACCEPTED,
	MESSAGE_REQUEST_RECEIVED,
	MESSAGE_REQUEST_SENT,
	NEAR_ME_USER_UPDATE,
	PHONE_CALL_REQUEST_ACCEPTED,
	PHONE_CALL_REQUEST_RECEIVED,
	PHONE_CALL_REQUEST_SENT,
	SHORTLIST_ADDED,
	SHORTLIST_REMOVED,
	USER_FEMALE_PRONOUN, 
	USER_GENDER_MALE, 
	USER_MALE_PRONOUN, 
	VIDEO_CALL_ANSWERED,
	VIDEO_CALL_DIALLED,
	VIDEO_CALL_ENDED,
	VIDEO_CALL_MISSED,
	VIDEO_CALL_REJECTED,
	VIDEO_CALL_REQUEST_ACCEPTED,
	VIDEO_CALL_REQUEST_RECEIVED,
	VIDEO_CALL_REQUEST_SENT,
	MESSAGE_DISABLED,
	PHONE_CALL_DISABLED,
	VIDEO_CALL_DISABLED,
	AUDIO_CALL_ENDED,
	AUDIO_CALL_ANSWERED,
	CHAT_SEND
} from '../constants/Constants';

export const notificationSound = [
  {
    title     : 'Default',
    filename  : 'iphone.mp3',
    path      : require('../audios/iphone.mp3'),
  },
  {
    title     : 'Twitter',
    filename  : 'twitter.mp3',
    path      : require('../audios/twitter.mp3'),
  },
  {
    title     : 'Water Drop',
    filename  : 'water_drop.mp3',
    path      : require('../audios/water_drop.mp3'),
  },
  {
    title     : 'Nature',
    filename  : 'nature.mp3',
    path      : require('../audios/nature.mp3'),
  },
  {
    title     : 'Smart',
    filename  : 'smart.mp3',
    path      : require('../audios/smart.mp3'),
  },
  {
    title     : 'Dizzy',
    filename  : 'dizzy.mp3',
    path      : require('../audios/dizzy.mp3'),
  }
];

	export const notificationContent = (userName = '', isSender) => {
		
		return ({
			[CALENDAR_INVITE_ACCEPTED]: {
				notifType  				 		 : CALENDAR_INVITE_ACCEPTED,
				notifTitle					 	 : 'S.O.Search Calendar',
				notifBody 					 	 : `${userName} accepted your calendar invite.`
			},
		
			[CALENDAR_INVITE_DECLINED]: {
				notifType  				 		 : CALENDAR_INVITE_DECLINED,
				notifTitle					 	 : 'S.O.Search Calendar',
				notifBody 					 	 : `${userName} declined your calendar invite.`
			},
	
			[CALENDAR_INVITE_SENT]:  {
				notifType  				 		 : CALENDAR_INVITE_SENT,
				notifTitle					 	 : 'S.O.Search Calendar',
				notifBody					 		 : `${userName} sent you a calendar invite.`
			},
	
			[CALENDAR_INVITE_UPDATED]: {
				notifType  				 		 : CALENDAR_INVITE_UPDATED,
				notifTitle					 	 : 'S.O.Search Calendar',
				notifBody					 		 : `${userName} updated the calendar invite.`
			},

			[CALENDAR_INVITE_RECEIVED]: {
				notifType  				 		 : CALENDAR_INVITE_RECEIVED,
				notifTitle					 	 : null,
				notifBody					 		 : null
			},

			[HEART_ACCEPTED]: {
				notifType  				 		 : HEART_ACCEPTED,
				notifTitle					 	 : 'S.O.Search Profile',
				notifBody   				 	 : `${userName} hearted you.`
			},

			[HEART_SENT]: {
				notifType  				 		 : HEART_SENT,
				notifTitle					 	 : 'S.O.Search Profile',
				notifBody   				 	 : `${userName} hearted you.`
			},

			[HEART_UNLIKED]: {
				notifType  				 		 : HEART_UNLIKED,
				notifTitle					 	 : 'S.O.Search',
				notifBody   				 	 : null
			},

			[HEART_REMOVED]: {
				notifType  				 		 : HEART_REMOVED,
				notifTitle					 	 : 'S.O.Search',
				notifBody   				 	 : null
			},

			[MESSAGE_REQUEST_SENT]: {
				notifType  				 		 : MESSAGE_REQUEST_SENT,
				notifTitle					 	 : 'S.O.Search Message',
				notifBody   				 	 : `${userName} sent you a chat request.`
			},

			[CHAT_SEND]: {
				notifType  				 		 : CHAT_SEND,
				notifTitle					 	 : 'S.O.Search',
				notifBody   				 	 : null,
				isHidden							 : true,
				isNotificationShowed	 : true,
			},

			[MESSAGE_REQUEST_RECEIVED]: {
				notifType  				 		 : MESSAGE_REQUEST_RECEIVED,
				notifTitle					 	 : null,
				notifBody					 		 : null
			},

			[MESSAGE_REQUEST_ACCEPTED]: {
				notifType  				 		 : MESSAGE_REQUEST_ACCEPTED,
				notifTitle					 	 : 'S.O.Search Message',
				notifBody					 		 : `${userName} accepted your chat request.`
			},

			[MESSAGE_DISABLED]: {
				notifType							 : MESSAGE_DISABLED,
				isNotificationShowed	 : false,
				isHidden							 : true,
				notifTitle						 : 'S.O.Search',
				notifBody							 : null
			},

			[PHONE_CALL_REQUEST_SENT]: {
				notifType  				 		 : PHONE_CALL_REQUEST_SENT,
				notifTitle					 	 : 'S.O.Search Voice Call',
				notifBody   				 	 : `${userName} sent you a voice call request.`
			},

			[PHONE_CALL_REQUEST_RECEIVED]: {
				notifType  				 		 : PHONE_CALL_REQUEST_RECEIVED,
				notifTitle					 	 : null,
				notifBody					 		 : null
			},

			[PHONE_CALL_REQUEST_ACCEPTED]: {
				notifType  				 		 : PHONE_CALL_REQUEST_ACCEPTED,
				notifTitle					 	 : 'S.O.Search Voice Call',
				notifBody					 		 : `${userName} accepted your voice call request.`
			},

			[PHONE_CALL_DISABLED]: {
				notifType							 : PHONE_CALL_DISABLED,
				isNotificationShowed	 : false,
				isHidden							 : true,
				notifTitle						 : 'S.O.Search',
				notifBody							 : null
			},

			[VIDEO_CALL_REQUEST_SENT]: {
				notifType  				 		 : VIDEO_CALL_REQUEST_SENT,
				notifTitle					 	 : 'S.O.Search Video Call',
				notifBody   				 	 : `${userName} sent you a video call request.`
			},

			[VIDEO_CALL_REQUEST_RECEIVED]: {
				notifType  				 		 : VIDEO_CALL_REQUEST_RECEIVED,
				notifTitle					 	 : 'S.O.Search Video Call',
				notifBody					 		 : null
			},

			[VIDEO_CALL_REQUEST_ACCEPTED]: {
				notifType  				 		 : VIDEO_CALL_REQUEST_ACCEPTED,
				notifTitle					 	 : 'S.O.Search Video Call',
				notifBody					 		 : `${userName} accepted your video call request.`
			},

			[VIDEO_CALL_DISABLED]: {
				notifType							 : VIDEO_CALL_DISABLED,
				isNotificationShowed	 : false,
				isHidden							 : true,
				notifTitle						 : 'S.O.Search',
				notifBody							 : null
			},
	
			[SHORTLIST_ADDED]: {
				notifType  				 		 : SHORTLIST_ADDED,
				notifTitle					 	 : 'S.O.Search',
				notifBody   				 	 : null
			},

			[SHORTLIST_REMOVED]: {
				notifType  				 		 : SHORTLIST_REMOVED,
				notifTitle					 	 : 'S.O.Search',
				notifBody					 		 : null
			},

			[BLOCKLIST_ADDED]: {
				notifType  				 		 : BLOCKLIST_ADDED,
				notifTitle					 	 : 'S.O.Search',
				notifBody					 		 : null
			},

			[BLOCKLIST_REMOVED]: {
				notifType  				 		 : BLOCKLIST_REMOVED,
				notifTitle					 	 : 'S.O.Search',
				notifBody					 		 : null
			},

			[AUDIO_CALL_DIALLED]: {
				notifType  						 : AUDIO_CALL_DIALLED,
				isNotificationShowed   : false,
				notifTitle             : 'Audio Call',
				notifBody        			 : userName
			},

			[AUDIO_CALL_ANSWERED]: {
				notifType              : AUDIO_CALL_ANSWERED,
				isNotificationShowed   : false,
				notifTitle             : 'Audio Call',
				notifBody              : null,
				notifHistoryDetail 	   : 'Audio Call Answered'
			},

			[AUDIO_CALL_MISSED]: {
				notifType              : AUDIO_CALL_MISSED,
				isNotificationShowed   : false,
				notifTitle             : 'Voice Call',
				notifBody              : `You missed a voice call from ${userName}.`
			},

			[AUDIO_CALL_ENDED]: {
				notifType              : AUDIO_CALL_ENDED,
        isNotificationShowed   : false,
        notifTitle             : 'Audio Call',
				notifBody              : null
			},

			[VIDEO_CALL_ANSWERED]: {
				notifType              : VIDEO_CALL_ANSWERED,
				isNotificationShowed   : false,
				notifTitle             : 'Video Call',
				notifBody              : null,
				notifHistoryDetail 	   : 'Video Call Answered'
			},

			[VIDEO_CALL_REJECTED]: {
				notifType              : VIDEO_CALL_REJECTED,
				isNotificationShowed   : false,
				notifTitle             : 'Call Rejected',
				notifBody              : userName
			},

			[VIDEO_CALL_ENDED]: {
				notifType              : VIDEO_CALL_ENDED,
        isNotificationShowed   : false,
        notifTitle             : 'Video Call',
				notifBody              : null
			},

			[VIDEO_CALL_DIALLED]: {
				notifType  						 : VIDEO_CALL_DIALLED,
				isNotificationShowed   : false,
				notifTitle       			 : 'Video Call',
				notifBody        			 : userName
			},

			[VIDEO_CALL_MISSED]: {
				notifType              : VIDEO_CALL_MISSED,
				isNotificationShowed   : false,
				notifTitle             : 'Video Call',
				notifBody              : `You missed a video call from ${userName}.`
			}
		})
	};