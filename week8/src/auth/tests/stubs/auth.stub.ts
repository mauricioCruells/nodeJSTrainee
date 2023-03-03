export const signInResponse = () => {
  return {
    status: 200,
    message: 'something',
    userInfo: {
      username: 'username',
      token: 'jwttokenk',
    },
  };
};

export const credentials = () => {
  return {
    username: 'something',
    password: 'something',
  };
};

export const signOutResponse = () => {
  return {
    status: 200,
    message: 'something',
    data: [
      {
        userId: 'username',
      },
    ],
  };
};
