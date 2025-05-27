export interface CreateCustomer {
    name: string;
    phone: string;
    passport_series: string;
    passport_number: number;
}

export interface CustomerEntity extends CreateCustomer {
    id: number;
}

export interface UpdateCustomer extends Partial<CreateCustomer> { }
