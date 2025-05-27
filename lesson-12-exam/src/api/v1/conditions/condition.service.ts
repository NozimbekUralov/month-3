import { BaseService } from "@/utils";
import { DB } from '@/lib/mysql'
import { ConditionEntity, CreateCondition, UpdateCondition } from "./condition.model";


export class ConditionService extends BaseService<
    ConditionEntity,
    CreateCondition,
    UpdateCondition
> {
    constructor() {
        super("discount_conditions", DB)
    }
}