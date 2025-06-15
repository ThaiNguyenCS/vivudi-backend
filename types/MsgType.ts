export enum MSG_ID {
  // Thông báo bắt buộc nhập
  MSG_REQUIRED = 0,
  // Thông báo sai định dạng
  MSG_REGEX = 1,
  // Thông báo độ dài tối thiểu
  MSG_MIN_LENGTH = 2,

  // ID cha của các message liên quan đến đăng nhập
  MSG_AUTH_LOGIN = 1000,
};

type NumRange<Start extends number, End extends number, R extends number[] = []> =
  R['length'] extends End
  ? Start | R[number]
  : NumRange<Start, End, [...R, R['length']]>;

export type MSG_API_ID = NumRange<0, 200>;

/******************************************************************************
 * Kiểu object chứa các message theo MSG_API_ID, chỉ cho phép key từ 0-199.  *
 ******************************************************************************/
export type ApiMessageObject = {
  [key in MSG_API_ID]?: string;
};

/******************************************************************************
 * Kiểu object chứa các message theo MSG_ID.                                  *
 ******************************************************************************/
export type MessageObject = {
  [key in MSG_ID]?: string | ApiMessageObject;
};