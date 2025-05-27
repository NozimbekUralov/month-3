import { BaseService } from "@/utils";
import { CreateProduct, ProductEntity, UpdateProduct } from "./product.model";
import { DB } from "@/lib/mysql"

export class ProductService extends BaseService<ProductEntity, CreateProduct, UpdateProduct> {
    constructor() {
        super("products", DB);
    };
    async getSoldItems(from: Date, to: Date, page: number, limit: number) {
        const rows = await this.db.query(
            `SELECT p.*, c.name as customer_name, ct.create_at
            FROM
                contracts ct
                JOIN products p ON ct.product = p.id
                JOIN customers c ON ct.customer = c.id
            WHERE
                ct.create_at BETWEEN ? AND ? LIMIT ? OFFSET ?`,
            [from, to, page, (page - 1) * limit]
        );
        return rows;
    }

    async getOverdueCustomers() {
        const rows = await this.db.query(
            `SELECT
                c.name as customer_name,
                p.name as product_name,
                ct.id as contract_id,
                (
                    (
                        p.price * dc.percent / 100 * dc.month
                    ) - IFNULL(SUM(pm.amount), 0)
                ) AS remaining,
                CAST(
                    DATEDIFF(NOW(), ct.create_at) - (
                        COUNT(pm.id) * (dc.month / COUNT(pm.id))
                    ) AS SIGNED
                ) AS overdue_days
            FROM
                contracts ct
                JOIN customers c ON ct.customer = c.id
                JOIN products p ON ct.product = p.id
                JOIN statuses s ON ct.id = s.contract
                JOIN discount_conditions dc ON ct.agreement = dc.id
                JOIN payments pm ON pm.contract = ct.id
            WHERE
                s.is_completed = false
            GROUP BY
                ct.id
            HAVING
                remaining > 0 AND overdue_days > 0`
        );
        return rows;
    }

}