import { API_LINK, TOKEN_KEY } from "@/constants/data";
import { AuthStateType } from "@/context/AuthContext";
import { UserResponse } from "@/types";
import * as SecureStore from "expo-secure-store";

export const login = async (
  email: string,
  password: string,
  setState: React.Dispatch<React.SetStateAction<AuthStateType>>
) => {
  try {
    const request = await fetch(`${API_LINK}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
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

// const login = async (email: string, password: string) => {
//   try {
//     const request = await fetch(`${API_URL}/auth`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//     const result = await request.json();
//     setAuthState({
//       token: result.data.token,
//       authenticated: true,
//     });
//     await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
//     return result;
//   } catch (e) {
//     return { error: true, message: (e as any).response.data.msg };
//   }
// };
