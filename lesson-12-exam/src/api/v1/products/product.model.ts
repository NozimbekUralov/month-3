export interface ProductEntity extends CreateProduct {
    id: number;
}

export interface CreateProduct {
    name: string;
    price: number;
    count: number;
};

export interface UpdateProduct extends Partial<CreateProduct> { };
