import axios from "axios";
import { API_URL } from "@/constant/env";

export class ApiService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_URL;
  }

  get = async (route: string, params: any) => {
    const res = await axios.get(`${this.baseUrl}${route}`, { params });
    return res.data;
  };

  post = async (route: string, id: string, data: any) => {
    const res = await axios.post(`${this.baseUrl}${route}/${id}`, data);
    return res.data;
  };

  put = async (route: string, id: string, data: any) => {
    const res = await axios.put(`${this.baseUrl}${route}/${id}`, data);
    return res.data;
  };

  delete = async (route: string, id: string) => {
    const res = await axios.delete(`${this.baseUrl}${route}/${id}`);
    return res.data;
  };
}
