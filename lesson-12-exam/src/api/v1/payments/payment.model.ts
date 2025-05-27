export interface PaymentEntity extends CreatePayment {
    id: number
    is_paid: boolean
}

export interface CreatePayment {
    amount: number
    contract: number
}

export interface UpdatePayment extends Partial<CreatePayment> {
    is_paid?: boolean
}
