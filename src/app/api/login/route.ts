import { ApiService } from "@/app/api/apiService";
import { saveToken } from "@/lib/storage";
const apiService = new ApiService();

export async function login(email: string, password: string) {
  const res = await apiService.post("/account/login", "", { email, password });
  if (res.success) {
    saveToken(res.data);
  }
  return res;
}
