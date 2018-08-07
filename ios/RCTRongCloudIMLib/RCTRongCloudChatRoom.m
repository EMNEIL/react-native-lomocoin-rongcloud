//
//  RCTRongCloudChatRoom.m
//  RCTRongCloudIMLib
//
//  Created by yexi on 2018/8/7.
//  Copyright © 2018年 lovebing.org. All rights reserved.
//

#import "RCTRongCloudChatRoom.h"
@interface RCTRongCloudChatRoom()
@end

@implementation RCTRongCloudChatRoom
+ (RCIMClient *) getClient {
    return [RCIMClient sharedRCIMClient];
}

+ (void)joinChatRoom:(NSString *)targetId
        messageCount:(int)messageCount
             success:(void (^)(void))successBlock
               error:(void (^)(RCErrorCode status))errorBlock{
    
    [[self getClient] joinChatRoom:targetId messageCount:messageCount success:^{
        successBlock();
    } error:^(RCErrorCode status) {
        errorBlock(status);
    }];

}


+ (void)joinExistChatRoom:(NSString *)targetId
             messageCount:(int)messageCount
                  success:(void (^)(void))successBlock
                    error:(void (^)(RCErrorCode status))errorBlock{
    [[self getClient] joinExistChatRoom:targetId messageCount:messageCount success:^{
        successBlock();
    } error:^(RCErrorCode status) {
        errorBlock(status);
    }];
}

+ (void)quitChatRoom:(NSString *)targetId
             success:(void (^)(void))successBlock
               error:(void (^)(RCErrorCode status))errorBlock{
    [[self getClient] quitChatRoom:targetId success:^{
        successBlock();
    } error:^(RCErrorCode status) {
        errorBlock(status);
    }];
    
}

+ (void)getChatRoomInfo:(NSString *)targetId
                  count:(int)count
                  order:(RCChatRoomMemberOrder)order
                success:(void (^)(RCChatRoomInfo *chatRoomInfo))successBlock
                  error:(void (^)(RCErrorCode status))errorBlock{
    
    [[self getClient] getChatRoomInfo:targetId count:count order:order success:^(RCChatRoomInfo *chatRoomInfo) {
        successBlock(chatRoomInfo);
    } error:^(RCErrorCode status) {
        errorBlock(status);
    }];
    
}

+ (void)getRemoteChatroomHistoryMessages:(NSString *)targetId
                              recordTime:(long long)recordTime
                                   count:(int)count
                                   order:(RCTimestampOrder)order
                                 success:(void (^)(NSArray *messages, long long syncTime))successBlock
                                   error:(void (^)(RCErrorCode status))errorBlock{
    
    [[self getClient] getRemoteChatroomHistoryMessages:targetId recordTime:recordTime count:count order:order success:^(NSArray *messages, long long syncTime) {
        successBlock(messages,syncTime);
    } error:^(RCErrorCode status) {
        errorBlock(status);
    }];

}



@end
