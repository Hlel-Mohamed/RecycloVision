import client from '../utils/axios';

const ProductService = {
    async getAllProducts() {
        try {
            const response = await client().get('/api/products');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getProductById(id: string) {
        try {
            const response = await client().get(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async createProduct(product: any) {
        try {
            const response = await client().post('/api/products/create', product);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateProduct(id: string, product: any) {
        try {
            const response = await client().put(`/api/products/update/${id}`, product);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async deleteProduct(id: string) {
        try {
            const response = await client().delete(`/api/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default ProductService;