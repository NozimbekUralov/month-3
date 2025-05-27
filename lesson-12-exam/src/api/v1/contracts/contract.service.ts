import { BaseService } from "@/utils";
import { ContractEntity, CreateContract, UpdateContract } from "./contract.model";
import { DB } from "@/lib/mysql";


export class ContractService extends BaseService<
    ContractEntity,
    CreateContract,
    UpdateContract
> {
    constructor() {
        super('contracts', DB)
    }
}