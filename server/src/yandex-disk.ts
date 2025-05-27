import axios, { AxiosInstance } from "axios";

/** Поддерживаемые значения размера изображения. */
export enum PreviewSize {
    /** 150 пикселей. */
    S = "S",

    /** 300 пикселей. */
    M = "M",

    /** 500 пикселей. */
    L = "L",

    /** 800 пикселей. */
    XL = "XL",

    /** 1024 пикселей. */
    XXL = "XXL",

    /** 1280 пикселей. */
    XXXL = "XXXL",
}

export class YandexDiskIntegration {
    private code = 'ko3k33t5nbvlgb4d';

    private OAuthBaseUri = "https://oauth.yandex.ru";
    private ApiBaseUri = "https://cloud-api.yandex.net/v1/disk";

    private readonly clientId = '55e896757740455fa28bd66eeeb1f9ce';
    private readonly clientSecret = '3073f3b296814e518c78e868dda6b313';

    private YandexDiskApi: AxiosInstance;
    private OAuthApi: AxiosInstance;

    private readonly ResourceModelMap = {
        name: "name",
        type: "type",
        mediaType: "media_type",
        preview: "preview",
        sizes: "sizes",
        embedded: "_embedded",
        embeddedItems: "_embedded.items",
        embeddedItemsName: "_embedded.items.name",
        embeddedItemsType: "_embedded.items.type",
        embeddedItemsMediaType: "_embedded.items.media_type",
        embeddedItemsPreview: "_embedded.items.preview",
        embeddedItemsSizes: "_embedded.items.sizes",
    };

    public constructor(token: string = "") {
        // https://oauth.yandex.ru/authorize?response_type=token&client_id=55e896757740455fa28bd66eeeb1f9ce
        const _debugToken = "y0__xDe3oeRBhiRrTUg7Jj2pxJqG5S5cFl-S2Ajx0KgrifCd3CtoA";
        this.YandexDiskApi = axios.create({
            baseURL: this.ApiBaseUri,
            headers: {
                Authorization: `OAuth ${_debugToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const encoded = btoa(`client_id:${this.clientSecret}`);
        this.OAuthApi = axios.create({
            baseURL: this.OAuthBaseUri,
            headers: {
                Authorization: `Basic ${encoded}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    public getAuthorizeUri(redirectUri: string): string {
        // https://yandex.ru/dev/id/doc/dg/oauth/reference/auto-code-client.html

        const uri = `${this.OAuthBaseUri}/authorize`;
        const query = `client_id=${this.clientId}&grant_type=authorization_code`;

        // const query = querystring.stringify({
        //     client_id: configuration.integrations.yandex.id,
        //     redirect_uri: redirectUri,
        //     response_type: "token",
        // });
        return `${uri}?${query}`;
    }

    codeToToken() {     // 'code': this.code,
        this.OAuthApi.post(`${this.getAccessTokenUri()}`, {
            'grant_type':'authorization_code',
        }).then((r) => {
            console.log(r.status);
            console.log(r.data);
        }).catch((e) => {

            console.log(e);
        });
    }

    private getAccessTokenUri(): string {
        return `${this.OAuthBaseUri}/token`;
    }

    async mock() {
        try {
            const response = await this.YandexDiskApi.get("/resources?path=app:/");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    public async resources(path: string, preview_size?: PreviewSize): Promise<any> {
        const fields = Object.values(this.ResourceModelMap).join(",");
        const params = { path, fields };

        const response = await this.YandexDiskApi.get("/resources", { params });
        if (response.status !== 200) {
            return null;
        }

        return response.data;
    }

    public async folderContent(path: string): Promise<any> {
        const resource = await this.resources(path);
        if (resource[this.ResourceModelMap.type] !== "dir") {
            throw Error();
            // throw ApiException.BadRequest(ApiError.HTTP_BADREQUEST, "Resource is not a folder.");
        }

        return resource[this.ResourceModelMap.embedded].items;
    }

    public async upload(path: string, file: any, overwrite: boolean = true): Promise<void> {
        const params = { path, overwrite };

        let response = await this.YandexDiskApi.get("/resources/upload", { params });
        if (response.status !== 200) {
            throw Error();
            // throw ApiException.Internal(ApiError.HTTP_INTERNAL, "Unable to upload file");
        }

        response = await axios.put(response.data.href, file);
        if (response.status !== 201 && response.data.error) {
            throw Error();
            // throw ApiException.Internal(ApiError.HTTP_INTERNAL, response.data.message);
        }
    }

    public async uploadMany(files: any[]): Promise<void> {
        for (const file of files) {
            this.upload(file.name, file);
        }
    }

    private isImage(resource: any): boolean {
        return resource[this.ResourceModelMap.type] !== "dir" && resource[this.ResourceModelMap.mediaType] === "image";
    }

    public async view(path: string): Promise<string | null> {
        const resource = await this.resources(path);
        if (!this.isImage(resource)) {
            throw Error();
            // throw ApiException.BadRequest(ApiError.HTTP_BADREQUEST, "Resource is not an image.");
        }

        const sizes = resource[this.ResourceModelMap.sizes];
        if (!Array.isArray(sizes)) {
            return null;
        }

        const image = sizes.find(p => p.name === "ORIGINAL");
        if (!image) {
            return null;
        }

        return image.url;
    }

    public async preview(path: string, size: PreviewSize): Promise<string | null> {
        const resource = await this.resources(path, size);
        if (!this.isImage(resource)) {
            throw Error();
            // throw ApiException.BadRequest(ApiError.HTTP_BADREQUEST, "Resource is not an image.");
        }

        // В ключе preview ссылка на требуемый размер уменьшенного изображения (превью файла).
        return resource[this.ResourceModelMap.preview] ?? null;
    }
}
