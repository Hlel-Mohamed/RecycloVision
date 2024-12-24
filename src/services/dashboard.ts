import client from '../utils/axios';

const DashboardService = {
    async getSubmissionsSummary() {
        try {
            const response = await client().get('/api/submissions/summary');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getUsersSummary() {
        try {
            const response = await client().get('/user/summary');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getRecyclingStats() {
        try {
            const response = await client().get('/api/submissions/stats');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getRecentActivities() {
        try {
            const response = await client().get('/api/submissions/recent-activities');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getTotalItemsByUser(userId: string) {
        try {
            const response = await client().get(`/api/submissions/total-items/${userId}`);
            return response.data.totalItems;
        } catch (error) {
            throw error;
        }
    }
};

export default DashboardService;