import axios from "axios";
import { API_URL } from "@/constant/env";
import { getAccessToken, removeToken } from "@/lib/storage";

export class ApiService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_URL;
  }

  get = async (route: string, params: any) => {
    const res = await axios.get(`${this.baseUrl}${route}`, {
      params,
      headers: {
        "x-access-token": getAccessToken(),
      },
    });
    return res.data;
  };

  post = async (route: string, id: string, data: any) => {
    try {
      const res = await axios.post(`${this.baseUrl}${route}/${id}`, data, {
        headers: {
          "x-access-token": getAccessToken(),
        },
      });
      return res.data;
    } catch (err: any) {
      return this.handleError(err);
    }
  };

  put = async (route: string, id: string, data: any) => {
    const res = await axios.put(`${this.baseUrl}${route}/${id}`, data, {
      headers: {
        "x-access-token": getAccessToken(),
      },
    });
    return res.data;
  };

  delete = async (route: string, id: string) => {
    const res = await axios.delete(`${this.baseUrl}${route}/${id}`, {
      headers: {
        "x-access-token": getAccessToken(),
      },
    });
    return res.data;
  };

  handleError = (err: any) => {
    const { response } = err;
    if (response.statusCode === 401) {
      // @TODO: handle redirect to login page
      removeToken();
      return { success: false, message: "Unauthorized" };
    } else if (response.statusCode === 400) {
      return { success: false, message: response.data.message };
    } else if (response.statusCode === 500) {
      return { success: false, message: "Internal server error" };
    }
  };
}
