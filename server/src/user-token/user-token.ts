export interface IUserToken {
    id: number;
    userId: number;
    token: string;
    refreshToken: string;
    ttl: number;
    createdAt: string;
    updatedAt: string;
}
