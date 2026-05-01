export declare class BillingService {
    getTenantInvoice(tenantId: string): Promise<{
        tenantId: string;
        plan: string;
        due: number;
    }>;
}
