import client from '../utils/axios';

const SubmissionService = {
    async submit(submission: { items: string[], images: string[], points: number }) {
        try {
            const response = await client().post('/api/submit', submission);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getAll() {
        try {
            const response = await client().get('/api/submissions');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async approve(id: string) {
        try {
            const response = await client().put(`/api/admin/approve/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async reject(id: string) {
        try {
            const response = await client().put(`/api/admin/reject/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default SubmissionService;