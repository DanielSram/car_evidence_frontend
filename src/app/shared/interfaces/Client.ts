/**
 * Interface representing Client entity
 */
interface Client {
    id: number;
    name: string;
    phone: number;
    registrationDate: number;
    email: string;
    address?: string;
    crn?: number;
    surname?: string;
}
