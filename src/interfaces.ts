export interface LoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface StatusResponse {
  status: string;
}

export interface RegisterUserRes {
  id: number;
  username: string;
  idade: number;
  indAdmin: number;
}

export interface SaveTokenReq {
  token: string;
  type: number;
  user: string;
  validDate: string | Date;
}

export enum TokenStatus {
  VALIDO = 0,
  INVALIDADO = 1
}

export enum TokenType {
  ACCESS = 1,
  REFRESH = 2
}

export interface GenerateTokensReq {
  username: string;
  sub: number;
}