import client from "../utils/axios"

const User = {
    async getAdmins() {
        try {
            const response = await client().get("/user/admins")
            return response.data
        } catch (error) {
            throw error
        }
    },

    async getRecyclers() {
        try {
            const response = await client().get("/user/recyclers")
            return response.data
        } catch (error) {
            throw error
        }
    },

    async makeAdmin(id: string) {
        try {
            const response = await client().put(`/user/makeAdmin/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async makeRecycler(id: string) {
        try {
            const response = await client().put(`/user/makeRecycler/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async getUserById(id: string) {
        try {
            const response = await client().get(`/user/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async createUser(
        firstName: string,
        lastName: string,
        phone: Number,
        email: string,
        password: string
    ) {
        try {
            const response = await client().post("/user/create", {
                firstName,
                lastName,
                phone,
                email,
                password,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },

    async updateUser(user: any) {
        try {
            const response = await client().put(`/user/update/${user.id}`, user)
            return response.data
        } catch (error) {
            throw error
        }
    },
    async deleteUser(id: string) {
        try {
            const response = await client().delete(`/user/delete/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    },
}

export default User