//
//  RCTRongCloudChatRoom.h
//  RCTRongCloudIMLib
//
//  Created by yexi on 2018/8/7.
//  Copyright © 2018年 lovebing.org. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RongIMLib/RongIMLib.h>
#import <RongIMLib/RCIMClient.h>

@interface RCTRongCloudChatRoom : NSObject

+ (RCIMClient *) getClient;

#pragma mark --- public method
/*!
 加入聊天室（如果聊天室不存在则会创建）
 
 @param targetId                聊天室ID
 @param messageCount 进入聊天室时获取历史消息的数量，-1<=messageCount<=50
 @param successBlock            加入聊天室成功的回调
 @param errorBlock              加入聊天室失败的回调
 [status:加入聊天室失败的错误码]
 
 @discussion
 可以通过传入的messageCount设置加入聊天室成功之后，需要获取的历史消息数量。
 -1表示不获取任何历史消息，0表示不特殊设置而使用SDK默认的设置（默认为获取10条），0<messageCount<=50为具体获取的消息数量,最大值为50。注：如果是7.x系统获取历史消息数量不要大于30
 */

+ (void)joinChatRoom:(NSString *)targetId
        messageCount:(int)messageCount
             success:(void (^)(void))successBlock
               error:(void (^)(RCErrorCode status))errorBlock;


/*!
 加入已经存在的聊天室（如果不存在或超限会返回聊天室不存在错误23410 或 人数超限
 23411）
 
 @param targetId                聊天室ID
 @param messageCount 进入聊天室时获取历史消息的数量，-1<=messageCount<=50
 @param successBlock            加入聊天室成功的回调
 @param errorBlock              加入聊天室失败的回调
 [status:加入聊天室失败的错误码]
 
 @warning
 注意：使用Kit库的会话页面viewDidLoad会自动调用joinChatRoom加入聊天室（聊天室不存在会自动创建），
 如果您只想加入已存在的聊天室，需要在push到会话页面之前调用这个方法并且messageCount
 传-1，成功之后push到会话页面，失败需要您做相应提示处理
 
 @discussion
 可以通过传入的messageCount设置加入聊天室成功之后，需要获取的历史消息数量。
 -1表示不获取任何历史消息，0表示不特殊设置而使用SDK默认的设置（默认为获取10条），0<messageCount<=50为具体获取的消息数量,最大值为50。
 */

+ (void)joinExistChatRoom:(NSString *)targetId
             messageCount:(int)messageCount
                  success:(void (^)(void))successBlock
                    error:(void (^)(RCErrorCode status))errorBlock;

/*!
 退出聊天室
 
 @param targetId                聊天室ID
 @param successBlock            退出聊天室成功的回调
 @param errorBlock              退出聊天室失败的回调
 [status:退出聊天室失败的错误码]
 */
+ (void)quitChatRoom:(NSString *)targetId
             success:(void (^)(void))successBlock
               error:(void (^)(RCErrorCode status))errorBlock;

/*!
 获取聊天室的信息（包含部分成员信息和当前聊天室中的成员总数）
 
 @param targetId     聊天室ID
 @param count 需要获取的成员信息的数量（目前获取到的聊天室信息中仅包含不多于20人的成员信息，即0 <= count <=
 20，传入0获取到的聊天室信息将或仅包含成员总数，不包含具体的成员列表）
 @param order        需要获取的成员列表的顺序（最早加入或是最晚加入的部分成员）
 @param successBlock 获取成功的回调 [chatRoomInfo:聊天室信息]
 @param errorBlock   获取失败的回调 [status:获取失败的错误码]
 
 @discussion
 因为聊天室一般成员数量巨大，权衡效率和用户体验，目前返回的聊天室信息仅包含不多于20人的成员信息和当前成员总数。如果您使用RC_ChatRoom_Member_Asc升序方式查询，将返回最早加入的成员信息列表，按加入时间从旧到新排列；如果您使用RC_ChatRoom_Member_Desc降序方式查询，将返回最晚加入的成员信息列表，按加入时间从新到旧排列。
 */
+ (void)getChatRoomInfo:(NSString *)targetId
                  count:(int)count
                  order:(RCChatRoomMemberOrder)order
                success:(void (^)(RCChatRoomInfo *chatRoomInfo))successBlock
                  error:(void (^)(RCErrorCode status))errorBlock;

/*!
 从服务器端获取聊天室的历史消息
 @param targetId            聊天室ID
 @param recordTime       起始的消息发送时间戳，毫秒
 @param count               需要获取的消息数量， 0 < count <= 200
 @param order               拉取顺序，RC_Timestamp_Desc:倒序，RC_Timestamp_ASC:正序
 @param successBlock   获取成功的回调 [messages:获取到的历史消息数组, syncTime:下次拉取消息的时间戳]
 @param errorBlock        获取失败的回调 [status:获取失败的错误码]
 @discussion
 此方法从服务器端获取聊天室的历史消息，但是必须先开通聊天室消息云存储功能。
 指定开始时间,比如2016年9月1日10点(1472695200000), 默认是0(正序:从存储的第一条消息开始拉取,倒序:从存储的最后一条消息开始拉取)
 */
+ (void)getRemoteChatroomHistoryMessages:(NSString *)targetId
                              recordTime:(long long)recordTime
                                   count:(int)count
                                   order:(RCTimestampOrder)order
                                 success:(void (^)(NSArray *messages, long long syncTime))successBlock
                                   error:(void (^)(RCErrorCode status))errorBlock;

@end
