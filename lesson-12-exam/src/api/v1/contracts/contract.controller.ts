import { BaseController } from "@/utils";
import { ContractEntity, CreateContract, UpdateContract } from "./contract.model";
import { ContractService } from "./contract.service";
import { Body, Get, Path, Post, Query, Route, SuccessResponse, Tags } from "tsoa";
import { StatusService } from "../statuses/status.service";
import { PaymentService } from "../payments/payment.service";
import { ProductService } from "../products/product.service";
import { ConditionService } from "../conditions/condition.service";

@Route("contract")
@Tags("Contracts")
export class ContractController extends BaseController<
    ContractEntity,
    CreateContract,
    UpdateContract,
    ContractService
> {
    protected readonly statusService: StatusService
    protected readonly paymentService: PaymentService
    protected readonly productService: ProductService
    protected readonly conditionService: ConditionService

    constructor() {
        super(new ContractService())
        this.statusService = new StatusService()
        this.paymentService = new PaymentService()
        this.productService = new ProductService()
        this.conditionService = new ConditionService()
    }

    @SuccessResponse("201", "Created")
    @Post()
    async CREATE(@Body() data: CreateContract) {
        const contract = await super.CREATE(data);
        // const status = await this.statusService.create({ contract: contract.id })
        // const product = await this.productService.getById(contract.product)
        // const agreement = await this.conditionService.getById(contract.agreement)
        // const amount = +(product.price * agreement.percent / 100).toFixed(2)
        // const payment = this.paymentService.create({ contract: contract.id, amount })
        return contract;
    }

    @SuccessResponse("200", "OK")
    @Get('all')
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await super.GET_ALL(page, limit);
    }

    @SuccessResponse("200", "OK")
    @Get('/:id')
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id);
    }
}