
import { MessageObject, MSG_ID } from "./MsgType";

export const enMessages: MessageObject = {
  [MSG_ID.MSG_REQUIRED]: 'Please fill in the missing values: {n}',
  [MSG_ID.MSG_REGEX]: 'Field {0} must satisfy the format {1}',
  [MSG_ID.MSG_MIN_LENGTH]: 'Field {0} must have a minimum length of {1}',

  [MSG_ID.MSG_AUTH_LOGIN]: {
    0: 'Login successful',
    100: 'User not found',
    101: 'Incorrect password',
  },
};

const loginMessages = enMessages[MSG_ID.MSG_AUTH_LOGIN];
if (typeof loginMessages === 'object') {
  console.log(loginMessages[0])
}
