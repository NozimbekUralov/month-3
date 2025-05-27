import { BaseController } from "@/utils";
import { ConditionEntity, CreateCondition, UpdateCondition } from "./condition.model";
import { ConditionService } from "./condition.service";
import { Body, Delete, Get, Path, Post, Put, Query, Route, SuccessResponse, Tags } from "tsoa";

@Route("v1/condition")
@Tags("Conditions")
export class ConditionController extends BaseController<
    ConditionEntity,
    CreateCondition,
    UpdateCondition,
    ConditionService
> {
    constructor() {
        super(new ConditionService())
    }

    @SuccessResponse('201', 'Created')
    @Post()
    async CREATE(@Body() body: CreateCondition) {
        return await super.CREATE(body);
    }

    @SuccessResponse("200", "OK")
    @Get("all")
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10
    ) {
        return await super.GET_ALL(page, limit);
    }

    @SuccessResponse("200", "OK")
    @Get("/:id")
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id);
    }

    @SuccessResponse("200", "OK")
    @Put("/:id")
    async UPDATE(@Path() id: number, @Body() body: UpdateCondition) {
        return await super.UPDATE(id, body);
    }

    @SuccessResponse("200", "OK")
    @Delete("/:id")
    async DELETE(@Path() id: number) {
        return await super.DELETE(id);
    }
}
