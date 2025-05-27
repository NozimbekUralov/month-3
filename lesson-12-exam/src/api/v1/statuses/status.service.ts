import { BaseService } from "@/utils";
import { CreateStatus, StatusEntity, UpdateStatus } from "./status.model";
import { DB } from "@/lib/mysql";


export class StatusService extends BaseService<
    StatusEntity,
    CreateStatus,
    UpdateStatus
> {
    constructor() {
        super('statuses', DB)
    }
}