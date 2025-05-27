import { BaseService } from "@/utils";
import { DB } from '@/lib/mysql'
import { CreateCustomer, CustomerEntity, UpdateCustomer } from "./customer.model";

export class CustomerService extends BaseService<CustomerEntity, CreateCustomer, UpdateCustomer> {
    constructor() {
        super("customers", DB);
    }
}