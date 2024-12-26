import axios from "axios"

const client = () =>
  axios.create({
    baseURL: import.meta.env.VITE_APP_API || "/backend-api",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  })

export default client
