export interface IUserTokenCreateRequest {
    userId: number;
    token: string;
    refreshToken: string;
    ttl: number;
}

export interface IUserTokenUpdateRequest {
    token: string;
    refreshToken: string;
    ttl: number;
}
