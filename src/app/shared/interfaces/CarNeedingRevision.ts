/**
 * Interface with car needing revision data
 */
interface CarNeedingRevision {
    id: number;
    type: string;
    vin: string;
    nickname?: string;
    clientId?: number;
    clientName?: string;
    lendingId?: number;
    returnDate?: number;
    expirationDate?: number;
}
