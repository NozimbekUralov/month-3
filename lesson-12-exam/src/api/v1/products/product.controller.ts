import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Tags } from "tsoa";
import { ProductService } from "./product.service";
import { BaseController } from "@/utils";
import { CreateProduct, ProductEntity, UpdateProduct } from "./product.model";

@Route("v1/product")
@Tags("Products")
export class ProductsController extends BaseController<
    ProductEntity,
    CreateProduct,
    UpdateProduct,
    ProductService
> {

    constructor() {
        super(new ProductService());
    }

    @SuccessResponse("201", "Created")
    @Post()
    async CREATE(@Body() body: CreateProduct) {
        return await super.CREATE(body);
    }

    @SuccessResponse("200", "OK")
    @Get("/all")
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await super.GET_ALL(page, limit);
    }

    @SuccessResponse("200", "OK")
    @Put("/:id")
    async UPDATE(@Path() id: number, @Body() body: UpdateProduct) {
        return await super.UPDATE(id, body);
    }

    @SuccessResponse("200", "OK")
    @Get("/sold")
    async getSoldProducts(
        @Query() from: Date,
        @Query() to = new Date(),
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await this.service.getSoldItems(from, to, page, limit);
    }

    @Get('/overdue')
    async GET_OVERDUE() {
        return await this.service.getOverdueCustomers()
    }

    @SuccessResponse("200", "OK")
    @Get("/:id")
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id);
    }

    @SuccessResponse("200", "OK")
    @Delete("/:id")
    async DELETE(@Path() id: number) {
        return await super.DELETE(id);
    }
}
