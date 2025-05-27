export interface ContractEntity extends CreateContract {
    id: number
    created_at: Date
}

export interface CreateContract {
    customer: number
    product: number
    agreement: number
}

export interface UpdateContract extends Partial<CreateContract> { }