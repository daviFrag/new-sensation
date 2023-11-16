export type UserInterface = {
  username: string;
};

export type UserWithJwtInterface = {
  user: UserInterface;
  access_token: string;
};
