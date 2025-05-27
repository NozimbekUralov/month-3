import { BaseController } from "@/utils";
import { CreateCustomer, CustomerEntity, UpdateCustomer } from "./customer.model";
import { CustomerService } from "./customer.service";
import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Tags } from "tsoa";

@Route("v1/customer")
@Tags('Customers')
export class CustomerController extends BaseController<
    CustomerEntity,
    CreateCustomer,
    UpdateCustomer,
    CustomerService
> {
    constructor() {
        super(new CustomerService())
    }
    @SuccessResponse("201", "Created")
    @Post()
    async CREATE(@Body() body: CreateCustomer) {
        return await super.CREATE(body);
    };

    @SuccessResponse("200", "OK")
    @Get("all")
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await super.GET_ALL(page, limit);
    };

    @SuccessResponse("200", "OK")
    @Put("/:id")
    async UPDATE(@Path() id: number, @Body() body: UpdateCustomer) {
        return await super.UPDATE(id, body);
    };

    @SuccessResponse("200", "OK")
    @Delete("/:id")
    async DELETE(@Path() id: number) {
        return await super.DELETE(id);
    };

    @SuccessResponse("200", "OK")
    @Get("/:id")
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id);
    };
}