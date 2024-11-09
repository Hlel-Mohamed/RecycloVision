import client from "../utils/axios"

const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await client().post("/auth/login", {
        email,
        password,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },
  logout: async () => {
    try {
      const response = await client().post("/auth/logout")
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default auth
