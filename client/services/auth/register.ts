import { API_LINK, TOKEN_KEY } from "@/constants/data";
import { RegisterProps, UserResponse } from "@/types";
import * as SecureStore from "expo-secure-store";

export const register = async ({
  userData: { email, confirmPassword, password, phone, name },
  setState,
}: RegisterProps) => {
  try {
    const request = await fetch(`${API_LINK}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        phone,
        name,
      }),
    });

    const result: UserResponse = await request.json();

    await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    setState({
      token: result.token,
      authenticated: true,
    });

    return result;
  } catch (error: any) {
    return { status: "fail", message: error.message } as UserResponse;
  }
};
