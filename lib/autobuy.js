const fetch = require('node-fetch');
const qs = require('qs');
const url = "https://autobuy.io/api/";

class AutoBuyClient {

    constructor(key) {
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            "APIKey": key
        };
    }

    /*
     * Request Method
     * Sends all requests to AutoBuy API using proper endpoint, method, and applicable body
     */
    async #request(endpoint, method, body = false) {
        if(['POST','PUT'].includes(method) && !body) throw 'This endpoint requires a body';

        const data = {
            method,
            headers: this.headers
        };
        if(body) data.body = qs.stringify(body);
        return fetch(`${url}${endpoint}`, data)
            .then(response => response.text())
            .catch(error => console.error(error));
    }

    /*
     * Order Methods
     * Allows you to get all order or get a single order
     */

    orders(page = 1) {
        if(typeof page !== 'number') throw new TypeError("Parameter 'page' must be of type Number")
        return this.#request(`Orders?page=${page}`, 'GET');
    };

    getOrder(id) {
        if (!id) throw new Error("Paramter 'id' is required");
        return this.#request(`Order/${id}`, 'GET');
    };

    /*
     * Product Methods
     * Allows you to get all products, get a single product,
     * create new products, update products, and delete products
     */

    products() {
        return this.#request('Products', 'GET');
    }
    getProduct(id) {
        if (!id) throw new Error("Parameter 'id' is required");
        return this.#request(`Product/${id}`, 'GET');
    };

    createProduct(body) {
        if (typeof body !== 'object') throw new Error("'body' parameter is required and must be of type Object");
        if(body.id) throw new Error("Parameter 'body' must not have key of id");
        if(Object.keys(body).length < 1) throw new Error("You must supply at least one key to parameter 'body'")
        return this.#request('Product', 'POST', body);
    }

    updateProduct(body) {
        if (typeof body !== 'object') throw new Error("'body' parameter is required and must be of type Object");
        if(!body.id) throw new Error("Parameter 'body' must have key of id");
        return this.#request('/Product', 'PUT', body);
    }

    deleteProduct(id) {
        if (!id) throw new Error("Parameter 'id' is required");
        return this.#request('/Product', 'DELETE', { id })
    }
}

module.exports = { AutoBuyClient }
