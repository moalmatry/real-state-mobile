import { API_LINK, TOKEN_KEY } from "@/constants/data";
import { ResetPasswordProps, ResetPasswordResponse } from "@/types";
import * as SecureStore from "expo-secure-store";

export const resetPassword = async ({
  userData: { confirmPassword, password, resetCode },
  setState,
}: ResetPasswordProps) => {
  try {
    const request = await fetch(`${API_LINK}/auth/verify-reset-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resetCode,
        password,
        confirmPassword,
      }),
    });

    const result: ResetPasswordResponse = await request.json();
    if (result.status === "fail") return result;
    await SecureStore.setItemAsync(TOKEN_KEY, result.token);
    setState({
      authenticated: true,
      token: result.token,
    });

    return result;
  } catch (error: any) {
    return { status: "fail", message: error.message } as ResetPasswordResponse;
  }
};
