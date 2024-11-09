import axios from "axios"
const client = () =>
  axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  })

export default client
