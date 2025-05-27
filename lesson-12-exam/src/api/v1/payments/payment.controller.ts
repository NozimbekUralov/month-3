import { BaseController } from "@/utils";
import { CreatePayment, PaymentEntity, UpdatePayment } from "./payment.model";
import { PaymentService } from "./payment.service";
import { Body, Get, Path, Put, Query, Route, SuccessResponse, Tags } from "tsoa";

@Route("v1/payment")
@Tags("Payments")
export class PaymentController extends BaseController<
    PaymentEntity,
    CreatePayment,
    UpdatePayment,
    PaymentService
> {
    constructor() {
        super(new PaymentService())
    }

    @SuccessResponse("201", "Created")
    @Put('/:id')
    async UPDATE(@Path() id: number, @Body() data: UpdatePayment) {
        return await super.UPDATE(id, data);
    }

    @SuccessResponse("200", "OK")
    @Get('all')
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await super.GET_ALL(page, limit)
    }

    @SuccessResponse("200", "OK")
    @Get("/:id")
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id)
    }
}