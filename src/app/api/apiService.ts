import axios from "axios";
import { API_URL } from "@/constant/env";

export class ApiService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_URL;
  }

  get = async (route: string, params: any) => {
    try {
      const res = await axios.get(`${this.baseUrl}${route}`, { params });
      return res.data;
    } catch (err: any) {
      return this.handleError(err);
    }
  };

  post = async (route: string, id: string, data: any) => {
    try {
      const res = await axios.post(`${this.baseUrl}${route}/${id}`, data);
      return res.data;
    } catch (err: any) {
      return this.handleError(err);
    }
  };

  put = async (route: string, id: string, data: any) => {
    try {
      const res = await axios.put(`${this.baseUrl}${route}/${id}`, data);
      return res.data;
    } catch (err: any) {
      return this.handleError(err);
    }
  };

  delete = async (route: string, id: string) => {
    try {
      const res = await axios.delete(`${this.baseUrl}${route}/${id}`);
      return res.data;
    } catch (err: any) {
      return this.handleError(err);
    }
  };

  handleError = (err: any) => {
    const { response } = err;
    if (response.status === 401) {
      // @TODO: handle redirect to login page
      return { success: false, message: "Unauthorized" };
    } else if (response.status === 400) {
      return { success: false, message: response.data.message };
    } else if (response.status === 500) {
      return { success: false, message: "Internal server error" };
    }
  };
}
