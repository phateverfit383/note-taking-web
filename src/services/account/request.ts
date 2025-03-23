import { saveToken } from "@/lib/storage";
import { ApiService } from "../apiService";

const apiService = new ApiService();

export async function signup(email: string, password: string) {
  const res = await apiService.post("/account/signup", "", { email, password });
  if (res.success) {
    saveToken(res.data);
  }
  return res;
}
export async function login(email: string, password: string) {
  const res = await apiService.post("/account/login", "", { email, password });
  if (res.success) {
    saveToken(res.data);
  }
  return res;
}
