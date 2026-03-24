export type decodedUser = {
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
};
