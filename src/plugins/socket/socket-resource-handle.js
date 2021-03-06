import TalkEvent from './event/talk-event';
import RevokeEvent from './event/revoke-event';
import LoginEvent from './event/login-event';
import KeyboardEvent from './event/keyboard-event';
import GroupJoinEvent from './event/group-join-event';
import FriendApplyEvent from './event/friend-apply-event';

/**
 * WebSocket资源处理
 */
class SocketResourceHandle {

  // 当前接收的消息
  resuore = null;

  // 事件映射
  events = {
    // 消息事件名:映射的处理方法

    // 聊天消息事件
    'event_talk': 'talkEvent',

    // 好友上线下线通知
    'event_online_status': 'loginEvent',

    // 好友键盘输入事件
    'event_keyboard': 'keyboardEvent',

    // 聊天消息撤回事件
    'event_revoke_talk': 'revokeEvent',

    'event_friend_apply':'friendApplyEvent',

    'join_group': 'groupJoinEvent',
  };

  constructor(resuore) {
    this.resuore = resuore;

    // 判断消息事件是否注册
    if (this.__proto__.hasOwnProperty(this.events[resuore.event])) {
      this[this.events[resuore.event]]();
    } else {
      console.error(`Socket [${resuore.event}] 事件消息没有注册...`);
    }
  }

  // 聊天消息处理
  talkEvent() {
    (new TalkEvent(this.resuore.data)).handle();
  }

  // 登录消息处理
  loginEvent() {
    (new LoginEvent(this.resuore.data)).handle();
  }

  // 群聊邀请处理
  groupJoinEvent() {
    (new GroupJoinEvent(this.resuore.data)).handle();
  }

  // 添加好友申请处理
  friendApplyEvent() {
    (new FriendApplyEvent(this.resuore.data)).handle();
  }

  // 对方正在输入中事件处理
  keyboardEvent() {
    (new KeyboardEvent(this.resuore.data)).handle();
  }

  // 聊天消息撤回事件处理
  revokeEvent() {
    (new RevokeEvent(this.resuore.data)).handle();
  }
}

export default SocketResourceHandle;
