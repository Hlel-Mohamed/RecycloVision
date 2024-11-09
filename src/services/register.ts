import client from "../utils/axios"

const register = {
  async createUser(
    firstName: string,
    lastName: string,
    phone: string,
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
}

export default register
