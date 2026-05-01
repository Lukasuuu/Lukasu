export declare class AdminService {
    getStats(): Promise<{
        status: string;
        uptime: number;
    }>;
}
