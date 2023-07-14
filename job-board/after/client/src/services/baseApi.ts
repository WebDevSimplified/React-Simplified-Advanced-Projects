import { env } from "@/constants/config"
import axios from "axios"

export const baseApi = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})
