import client from '../utils/axios';

const OrderService = {
    async getAllOrders() {
        try {
            const response = await client().get('/api/orders/all');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getOrderById(id: string) {
        try {
            const response = await client().get(`/api/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getOrdersByUser(userId: string) {
        try {
            const response = await client().get(`/api/orders/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async createOrder(order: any) {
        try {
            const response = await client().post('/api/orders/create', order);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async deleteOrder(id: string) {
        try {
            const response = await client().delete(`/api/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async validate(id: string) {
        try {
            const response = await client().put(`/api/orders/validate/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async cancel(id: string) {
        try {
            const response = await client().put(`/api/orders/cancel/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

}

export default OrderService;