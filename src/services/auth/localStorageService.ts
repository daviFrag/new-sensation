import { UserWithJwtInterface } from '@/schemas';

const token_key = 'JIC.JWT';
const user_key = 'JIC.user';

export function setLocalStorageUserWithJwt(
  user_with_jwt: UserWithJwtInterface
): void {
  localStorage.setItem(token_key, user_with_jwt.access_token);
  localStorage.setItem(user_key, JSON.stringify(user_with_jwt.user));
}

export function getLocalStorageUserWithJwt(): UserWithJwtInterface {
  const access_token = localStorage.getItem(token_key) ?? '';
  const user_json = localStorage.getItem(user_key);
  const user = user_json ? JSON.parse(user_json) : null;
  return { access_token, user };
}

export function deleteLocalStorageUserWithJwt(): void {
  localStorage.removeItem(token_key);
  localStorage.removeItem(user_key);
}
