import { jwtDecode } from 'jwt-decode';
import type { decodedUser } from '../types/tokenDecodedType';

export const verifyToken = (token: string) => {
  return jwtDecode(token) as decodedUser;
};
