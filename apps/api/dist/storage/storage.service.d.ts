export declare class StorageService {
    getPresignedUrl(key: string): Promise<{
        key: string;
        url: string;
    }>;
}
