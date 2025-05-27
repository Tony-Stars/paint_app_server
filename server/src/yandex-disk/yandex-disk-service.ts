import axios, { AxiosInstance } from "axios";

export interface IYandexDiskService {
    upload(data: any, url: string): Promise<boolean>;
    getInfo(url: string): Promise<any>;
    delete(url: string): Promise<void>;
}

export class YandexDiskService implements IYandexDiskService {
    private client: AxiosInstance;
    private token: string | null = null;

    constructor() {
        this.client = axios;
    }

    public async upload(data: any, url: string): Promise<boolean> {
        if (this.token) {
            try {
                const response = await this.client.put(url,
                    { data: { 'file': data } },
                    { headers: { 'Authorization': `OAuth ${this.token}` } },
                );

                if (response.status == 201) {
                    return true;
                }

                return false;
            } catch (e) {
                console.log(`Не удалось выгрузить файл. Ошибка: ${e}`);
                return false;
            }

        }

        return false;
    }

    public async getInfo(url: string): Promise<any> {
        if (this.token) {
            const response = await this.client.get(url, { headers: { 'Authorization': `OAuth ${this.token}` } });
            if (response.status == 200) {
                return response.data;
            } else {
                return null;
            }
        }

        return null;
    }

    public async delete(url: string): Promise<void> {
        try {
            await this.client.delete(url, { headers: { 'Authorization': `OAuth ${this.token}` } });
        } catch (e) {
            console.log(`Не удалось удалить файл. Ошибка: ${e}`);
        }
    }
}
