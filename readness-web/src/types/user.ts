export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role_id: Role;
  hash_password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}
