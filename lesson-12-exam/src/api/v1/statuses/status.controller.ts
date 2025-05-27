import { BaseController } from "@/utils";
import { CreateStatus, StatusEntity, UpdateStatus } from "./status.model";
import { StatusService } from "./status.service";
import { Get, Path, Query, Route, SuccessResponse, Tags } from "tsoa";

@Route("v1/status")
@Tags("Statuses")
export class StatusController extends BaseController<
    StatusEntity,
    CreateStatus,
    UpdateStatus,
    StatusService
> {
    constructor() {
        super(new StatusService())
    }

    @SuccessResponse("200", "OK")
    @Get('all')
    async GET_ALL(
        @Query() page = 1,
        @Query() limit = 10,
    ) {
        return await super.GET_ALL(page, limit);
    }

    @SuccessResponse("200", "OK")
    @Get("/:id")
    async GET_BY_ID(@Path() id: number) {
        return await super.GET_BY_ID(id);
    }
}