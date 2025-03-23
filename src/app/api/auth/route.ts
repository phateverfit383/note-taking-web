import { ApiService } from "@/app/api/apiService";

const apiService = new ApiService();

export async function signup(email: string, password: string) {
  return await apiService.post("/account/signup", "", { email, password });
}

export async function login(email: string, password: string) {
  return await apiService.post("/account/login", "", { email, password });
}
