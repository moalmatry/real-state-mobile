import { API_LINK } from "@/constants/data";
import { Response } from "@/types";

export const forgotPassword = async (email: string) => {
  try {
    const request = await fetch(`${API_LINK}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result: Response = await request.json();

    return result;
  } catch (error: any) {
    return { status: "fail", message: error.message } as Response;
  }
};
