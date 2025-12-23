import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import API_URL from "@/configs/apiUrl";
import { Dispatch } from "redux";
import { reset } from "./authSlice";
import Router from "next/router";

interface UserData {
  username: string;
  password: string;
  email?: string;
}

interface UserResponse {
  username: string;
  token: string;
}

interface PlanCheckResponse {
  status: number;
  username: string;
  typeplan?: string;
}

const register = async (userData: UserData): Promise<UserResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    const user: UserResponse = {
      username: response.data.username,
      token: response.data.token,
    };
    if (response.data) {
      setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 30 });
    }
    return user;
  } catch (error: any) {
    throw error.response?.data || { message: "Error desconocido" };
  }
};

const login = async (userData: UserData): Promise<UserResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    const user: UserResponse = {
      username: response.data.username,
      token: response.data.token,
    };
    if (response.data) {
      setCookie("user", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 30 });
    }
    return user;
  } catch (error: any) {
    throw error.response?.data || { message: "Error desconocido" };
  }
};

const verificar_plan = async (token: string): Promise<PlanCheckResponse> => {
  try {
    const response = await axios.get(API_URL + "/subscription/check-subscription", {
      headers: {
        authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*"
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al verificar la suscripción" };
  }
};

const logout = (dispatch: Dispatch): boolean => {
  try {
    deleteCookie("user");
    dispatch(reset());
    Router.push("/");
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};

const authService = {
  register,
  login,
  verificar_plan,
  logout,
};

export default authService;