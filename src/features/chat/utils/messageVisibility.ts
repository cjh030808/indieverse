import { ChatMessage, ChatUser, ChatChannel } from '@/types/chat';

/**
 * 메시지 가시성을 제어하는 유틸리티 함수들
 * Private Q&A 채널에서 팬들은 서로의 메시지를 볼 수 없고,
 * 밴드 멤버만 모든 메시지를 볼 수 있도록 하는 로직
 */

export const canViewMessage = (
  message: ChatMessage, 
  currentUser: ChatUser, 
  channel: ChatChannel
): boolean => {
  // 채널이 private_qa가 아닌 경우, 모든 메시지 보기 가능
  if (channel.type !== 'private_qa') {
    return true;
  }

  // 밴드 멤버, 관리자, 모더레이터는 모든 메시지 보기 가능
  if (currentUser.isBandMember || currentUser.isAdmin || currentUser.isModerator) {
    return true;
  }

  // 밴드에서 보낸 메시지는 모든 팬이 볼 수 있음
  if (message.isFromBand) {
    return true;
  }

  // 자신이 보낸 메시지는 볼 수 있음
  if (message.senderId === currentUser.id) {
    return true;
  }

  // 시스템 메시지나 공지사항은 모든 사용자가 볼 수 있음
  if (message.type === 'system' || message.type === 'announcement') {
    return true;
  }

  // 그 외의 경우 (다른 팬의 메시지)는 볼 수 없음
  return false;
};

export const filterMessagesForUser = (
  messages: ChatMessage[], 
  currentUser: ChatUser,
  channel: ChatChannel
): ChatMessage[] => {
  return messages.filter(message => canViewMessage(message, currentUser, channel));
};

export const getPrivateQAMessagePlaceholder = (
  totalMessages: number,
  visibleMessages: number,
  currentUser: ChatUser
): string | null => {
  // 밴드 멤버는 플레이스홀더를 보지 않음
  if (currentUser.isBandMember || currentUser.isAdmin || currentUser.isModerator) {
    return null;
  }

  const hiddenCount = totalMessages - visibleMessages;
  if (hiddenCount > 0) {
    return `${hiddenCount}개의 다른 팬 질문이 있습니다. (밴드만 볼 수 있음)`;
  }

  return null;
};

export const shouldShowPrivateQANotice = (channel: ChatChannel, currentUser: ChatUser): boolean => {
  return channel.type === 'private_qa' && !currentUser.isBandMember && !currentUser.isAdmin && !currentUser.isModerator;
};