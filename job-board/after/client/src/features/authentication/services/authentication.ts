import { baseApi } from "@/services/baseApi"
import { User } from "../constants/types"

export function login(email: string, password: string) {
  return baseApi
    .post<User>("/users/login", { email, password })
    .then(res => res.data)
}

export function signup(email: string, password: string) {
  return baseApi
    .post<User>("/users/signup", {
      email,
      password,
    })
    .then(res => res.data)
}

export function logout() {
  return baseApi.delete("/users/logout")
}

export function getLoggedInUser() {
  return baseApi
    .get<User | null>("/users/session")
    .then(res => res.data ?? undefined)
}
