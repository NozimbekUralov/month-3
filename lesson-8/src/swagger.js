const fs = require('fs');

const getSwagger = (name) => {
    return JSON.parse(fs.readFileSync(process.cwd() + `/src/swaggers/${name}.json`, 'utf-8'));
}

const roleSwagger = getSwagger('roles');
const brandSwagger = getSwagger('brands');
const carSwagger = getSwagger('cars');
const userSagger = getSwagger('users');
const orderSwagger = getSwagger('book_orders');

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Nest Store",
        version: "1.0.0",
        contact: {
            url: "/api-docs-json",
        },
    },
    paths: {
        ...roleSwagger.paths,
        ...brandSwagger.paths,
        ...carSwagger.paths,
        ...userSagger.paths,
        ...orderSwagger.paths
    },
    components: {
        schemas: {
            ...roleSwagger.components.schemas,
            ...brandSwagger.components.schemas,
            ...carSwagger.components.schemas,
            ...userSagger.components.schemas,
            ...orderSwagger.components.schemas
        }
    }
};
module.exports = swaggerDocument;