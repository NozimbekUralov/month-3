import { BaseService } from "@/utils";
import { CreatePayment, PaymentEntity, UpdatePayment } from "./payment.model";
import { DB } from "@/lib/mysql";


export class PaymentService extends BaseService<
    PaymentEntity,
    CreatePayment,
    UpdatePayment
> {
    constructor() {
        super("payments", DB)
    }
}