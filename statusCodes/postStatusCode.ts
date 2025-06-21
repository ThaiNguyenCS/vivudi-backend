export const createPostStatusCode = {
  SUCCESS: {
    code: 0,
    message: "Create post successfully"
  },


  INVALID_DATA: {
    code: 100,
    message: "Invalid post data"
  },
  USER_NOT_FOUND: {
    code: 101,
    message: "User not found"
  }
}

export const GetPostStatusCode = {
  SUCCESS: {
    code: 0,
    message: "Get post successfully"
  },

  INVALID_DATA: {
    code: 100,
    message: "Invalid post data"
  },
  USER_NOT_FOUND: {
    code: 101,
    message: "User not found"
  }
}

export const UpdatePostStatusCode = {
  SUCCESS: {
    code: 0,
    message: "Updated post successfully"
  },

  INVALID_DATA: {
    code: 100,
    message: "Invalid post data"
  },
  USER_NOT_FOUND: {
    code: 101,
    message: "User not found"
  },

  POST_NOT_FOUND: {
    code: 102,
    message: "Not found post"
  },

  BAD_REQUEST: {
    code: 103,
    message: "Bad request exception"
  },
}

export const DeletePostStatusCode = {
  SUCCESS: {
    code: 0,
    message: "Delete post successfully"
  },
  POST_NOT_FOUND: {
    code: 101,
    message: "Post not found"
  }
}