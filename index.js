'use strict';
import {
    NativeModules,
    DeviceEventEmitter,
    NativeEventEmitter,
    Platform
}
from 'react-native';

const RongCloudIMLib = NativeModules.RongCloudIMLibModule;

var _onRongCloudMessageReceived = function(resp) {
    console.log("融云接受消息:" + JSON.stringify(resp));
}

var _onMessageRecalled = function(resp) {
    console.log("融云收到撤回消息:" + JSON.stringify(resp));
}
var _onChatRoomJoining = function(resp) {
    console.log("融云开始加入聊天室的回调:" + JSON.stringify(resp));
}
var _onChatRoomJoined = function(resp) {
    console.log("融云加入聊天室成功的回调:" + JSON.stringify(resp));
}
var _onChatRoomJoinFailed = function(resp) {
    console.log("融云加入聊天室失败的回调:" + JSON.stringify(resp));
}
var _onChatRoomQuited = function(resp) {
    console.log("融云退出聊天室成功的回调:" + JSON.stringify(resp));
}

// DeviceEventEmitter.addListener('onRongMessageReceived', (resp) => {
//     typeof (_onRongCloudMessageReceived) === 'function' && _onRongCloudMessageReceived(resp);
// });

const RongCloudIMLibEmitter = new NativeEventEmitter(RongCloudIMLib);

//消息内容的监听
const messageSubscription = RongCloudIMLibEmitter.addListener(
    'onRongMessageReceived',
    (resp) => {
        typeof(_onRongCloudMessageReceived) === 'function' && _onRongCloudMessageReceived(resp);
    }
);

const recallMessageSubscription = RongCloudIMLibEmitter.addListener(
    'onMessageRecalled',
    (resp) => {
        typeof(_onMessageRecalled) === 'function' && _onMessageRecalled(resp);
    }
);

//聊天室状态的监听
const chatRoomJoiningSubscription = RongCloudIMLibEmitter.addListener(
    'onChatRoomJoining',
    (resp) => {
        typeof(_onChatRoomJoining) === 'function' && _onChatRoomJoining(resp);
    }
);

const chatRoomJoinedSubscription = RongCloudIMLibEmitter.addListener(
    'onChatRoomJoined',
    (resp) => {
        typeof(_onChatRoomJoined) === 'function' && _onChatRoomJoined(resp);
    }
);

const chatRoomJoinFailedSubscription = RongCloudIMLibEmitter.addListener(
    'onChatRoomJoinFailed',
    (resp) => {
        typeof(_onChatRoomJoinFailed) === 'function' && _onChatRoomJoinFailed(resp);
    }
);
const chatRoomJoinQuitedSubscription = RongCloudIMLibEmitter.addListener(
    'onChatRoomQuited',
    (resp) => {
        typeof(_onChatRoomQuited) === 'function' && _onChatRoomQuited(resp);
    }
);


const ConversationType = {
    PRIVATE: 'PRIVATE',
    DISCUSSION: 'DISCUSSION',
    SYSTEM: 'SYSTEM'
};

export default {
    ConversationType: ConversationType,
    /**
     * SDK Init           初始化
     * Connect and Disconnect 连接与断开服务器
     * Received Message   接受新消息
     */
    initWithAppKey(appKey) {
        return RongCloudIMLib.initWithAppKey(appKey);
    },
    connectWithToken(token) {
        return RongCloudIMLib.connectWithToken(token);
    },
    //isReceivePush-true 开启后台推送 false-关闭后台推送
    disconnect(isReceivePush) {
        return RongCloudIMLib.disconnect(isReceivePush);
    },
    logout() {
        return RongCloudIMLib.logout();
    },
    getFCMToken() {
        if (Platform.OS === 'android') {
            return RongCloudIMLib.getFCMToken();
        } else {
            return '';
        }
    },
    onReceived(callback) {
        _onRongCloudMessageReceived = callback;
    },
    onMessageRecalled(callback) {
        _onMessageRecalled = callback;
    },


    /**
     * Unread Message 未读消息
     */
    getTotalUnreadCount() {
        // 获取全部未读消息数量（此消息数量为SDK本地查询到的未读消息数（有可能包含已退出群组的消息数量））
        return RongCloudIMLib.getTotalUnreadCount();
    },
    getTargetUnreadCount(conversationType, targetId) {
        // 获取某个会话类型的target 的未读消息数
        return RongCloudIMLib.getTargetUnreadCount(conversationType, targetId);
    },
    getConversationsUnreadCount(conversationTypes) {
        // 获取某些会话类型（conversationTypes为数组）的未读消息数（此消息数量为SDK本地查询到的未读消息数（有可能包含已退出群组的消息数量））
        return RongCloudIMLib.getConversationsUnreadCount(conversationTypes);
    },
    clearUnreadMessage(conversationType, targetId) {
        return RongCloudIMLib.clearUnreadMessage(conversationType, targetId);
    },


    /**
     * Send Message 消息发送
     */
    sendTextMessage(conversationType, targetId, content, pushContent, pushData, extra) {
        return RongCloudIMLib.sendTextMessage(conversationType, targetId, content, pushContent, pushData, extra);
    },
    sendImageMessage(conversationType, targetId, imageUrl, pushContent, pushData, extra) {
        return RongCloudIMLib.sendImageMessage(conversationType, targetId, imageUrl, pushContent, pushData, extra);
    },
    voiceBtnPressIn(conversationType, targetId, pushContent, pushData, extra) {
        return RongCloudIMLib.voiceBtnPressIn(conversationType, targetId, pushContent, pushData, extra);
    },
    voiceBtnPressOut(conversationType, targetId, pushContent, pushData, extra) {
        return RongCloudIMLib.voiceBtnPressOut(conversationType, targetId, pushContent, pushData, extra);
    },
    voiceBtnPressCancel(conversationType, targetId) {
        return RongCloudIMLib.voiceBtnPressCancel(conversationType, targetId);
    },
    audioPlayStart(filePath) {
        return RongCloudIMLib.audioPlayStart(filePath);
    },
    audioPlayStop() {
        return RongCloudIMLib.audioPlayStop();
    },

    /**
     * Recall Message 消息撤回
     */
    recallMessage(message, push) {
        return RongCloudIMLib.recallMessage(message, push);
    },


    /**
     * Message Operation 消息操作
     */
    getLatestMessages(type, targetId, count) {
        return RongCloudIMLib.getLatestMessages(type, targetId, count);
    },
    getHistoryMessages(type, targetId, oldestMessageId, count) {
        return RongCloudIMLib.getHistoryMessages(type, targetId, oldestMessageId, count);
    },
    getDesignatedTypeHistoryMessages(type, targetId, objectName, oldestMessageId, count) {
        return RongCloudIMLib.getDesignatedTypeHistoryMessages(type, targetId, objectName, oldestMessageId, count);
    },
    getDesignatedDirectionypeHistoryMessages(type, targetId, objectName, baseMessageId, count, direction) {
        return RongCloudIMLib.getDesignatedDirectionypeHistoryMessages(type, targetId, objectName, baseMessageId, count, direction);
    },
    getBaseOnSentTimeHistoryMessages(type, targetId, sentTime, before, after) {
        return RongCloudIMLib.getBaseOnSentTimeHistoryMessages(type, targetId, sentTime, before, after);
    },

    /**
     * Conversation List Operation 会话列表操作
     */
    getConversationList() {
        return RongCloudIMLib.getConversationList();
    },
    setConversationToTop(conversationType, targetId, isTop) {
        return RongCloudIMLib.setConversationToTop(conversationType, targetId, isTop);
    },
    getTopConversationList(conversationTypeList) {
        return RongCloudIMLib.getTopConversationList(conversationTypeList);
    },
    searchConversations(keyword) {
        return RongCloudIMLib.searchConversations(keyword);
    },

    /**
     * Conversation Draft 会话草稿操作
     */
    getTextMessageDraft(conversationType, targetId) {
        return RongCloudIMLib.getTextMessageDraft(conversationType, targetId);
    },
    saveTextMessageDraft(conversationType, targetId, content) {
        return RongCloudIMLib.saveTextMessageDraft(conversationType, targetId, content);
    },
    clearTextMessageDraft(conversationType, targetId) {
        return RongCloudIMLib.clearTextMessageDraft(conversationType, targetId);
    },

    /**
     * Delete Messages 删除消息
     */
    removeConversation(conversationType, targetId) {
        return RongCloudIMLib.removeConversation(conversationType, targetId);
    },
    clearTargetMessages(conversationType, targetId) {
        return RongCloudIMLib.clearTargetMessages(conversationType, targetId);
    },
    deleteTargetMessages(conversationType, targetId) {
        return RongCloudIMLib.deleteTargetMessages(conversationType, targetId);
    },
    deleteMessages(messageIds) {
        return RongCloudIMLib.deleteMessages(messageIds);
    },


    /**
     * Conversation Push Notification 会话消息提醒
     */
    setConversationNotificationStatus(conversationType, targetId, isBlocked) {
        //设置会话消息提醒 isBlocked（true 屏蔽  false 新消息提醒）  （return  0:（屏蔽） 1:（新消息提醒））
        return RongCloudIMLib.setConversationNotificationStatus(conversationType, targetId, isBlocked);
    },
    getConversationNotificationStatus(conversationType, targetId) {
        //获取会话消息提醒状态  （return  0:（屏蔽） 1:（新消息提醒））
        return RongCloudIMLib.getConversationNotificationStatus(conversationType, targetId);
    },

    /**
     * Global Push Notification 全局消息提醒
     */
    screenGlobalNotification() {
        //屏蔽全局新消息提醒
        return RongCloudIMLib.screenGlobalNotification();
    },
    removeScreenOfGlobalNotification() {
        //移除全局新消息屏蔽
        return RongCloudIMLib.removeScreenOfGlobalNotification();
    },
    getGlobalNotificationStatus() {
        //获取全局新消息提醒状态 （ return  0:（屏蔽） 1:（新消息提醒））
        return RongCloudIMLib.getGlobalNotificationStatus();
    },


    /**
     * Discussion 讨论组
     */
    createDiscussion(name, userIdList) {
        // 设置的讨论组名称长度不能超过40个字符，否则将会截断为前40个字符。
        return RongCloudIMLib.createDiscussion(name, userIdList);
    },
    addMemberToDiscussion(discussionId, userIdList) {
        return RongCloudIMLib.addMemberToDiscussion(discussionId, userIdList);
    },
    removeMemberFromDiscussion(discussionId, userId) {
        // 如果当前登陆用户不是此讨论组的创建者并且此讨论组没有开放加人权限，则会返回错误。
        // 不能使用此接口将自己移除，否则会返回错误。 如果您需要退出该讨论组，可以使用quitDiscussion方法。
        return RongCloudIMLib.removeMemberFromDiscussion(discussionId, userId);
    },
    quitDiscussion(discussionId) {
        return RongCloudIMLib.quitDiscussion(discussionId);
    },
    getDiscussion(discussionId) {
        return RongCloudIMLib.getDiscussion(discussionId);
    },
    setDiscussionName(discussionId, name) {
        return RongCloudIMLib.setDiscussionName(discussionId, name);
    },
    //注：isOpen type int,value CLOSED(1),OPENED(0);
    setDiscussionInviteStatus(discussionId, isOpen) {
        // 设置讨论组是否开放加人权限,讨论组默认开放加人权限，即所有成员都可以加人。如果关闭加人权限之后，只有讨论组的创建者有加人权限。
        return RongCloudIMLib.setDiscussionInviteStatus(discussionId, isOpen);
    },


    /**
     * Black List 黑名单
     */
    addToBlacklist(userId) {
        return RongCloudIMLib.addToBlacklist(userId);
    },
    removeFromBlacklist(userId) {
        return RongCloudIMLib.removeFromBlacklist(userId);
    },
    getBlacklistStatus(userId) {
        return RongCloudIMLib.getBlacklistStatus(userId);
    },
    getBlacklist() {
        return RongCloudIMLib.getBlacklist();
    },


    /**
     * chatroom 聊天室
     */

    //状态监听
    onChatRoomJoining(callback) {
        _onChatRoomJoining = callback;
    },
    onChatRoomJoined(callback) {
        _onChatRoomJoined = callback;
    },
    onChatRoomJoinFailed(callback) {
        _onChatRoomJoinFailed = callback;
    },
    onChatRoomQuited(callback) {
        _onChatRoomQuited = callback;
    },

    //聊天室方法
    joinChatRoom(targetId, messageCount) {
        return RongCloudIMLib.joinChatRoom(targetId, messageCount)
    },

    joinExistChatRoom(targetId, messageCount) {
        return RongCloudIMLib.joinExistChatRoom(targetId, messageCount)
    },

    quitChatRoom(targetId) {
        return RongCloudIMLib.quitChatRoom(targetId)
    },

    getChatRoomInfo(targetId, count,order) {
        return RongCloudIMLib.getChatRoomInfo(targetId, count, order)
    },
    getRemoteChatroomHistoryMessages(targetId, recordTime, count, order) {
        return RongCloudIMLib.getRemoteChatroomHistoryMessages(targetId, recordTime, count, order)
    }


};