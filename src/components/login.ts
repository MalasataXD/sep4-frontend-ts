import jwt_decode from "jwt-decode"; //64 base
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

export const JWTLocation: string = "jwt";

class Login {
  static isLoggedIn() {
    const token = localStorage?.getItem(JWTLocation);

    return token !== null && !isTokenExpired(token);
  }

  static login() {
    //if correct mail and password
    if (true) {
      const decodedToken = { username: "testuser" };

      const payload = {
        userId: 123,
        username: "john.doe",
      };

      const header = Buffer.from(JSON.stringify({ alg: "none" })).toString(
        "base64"
      );
      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
        "base64"
      );
      const token = `${header}.${encodedPayload}.`;

      console.log(token);

      localStorage.setItem("jwt", token);
    }
  }

  static logout() {
    localStorage.removeItem(JWTLocation);
  }
}

function isTokenExpired(token: string) {
  const decoded: any = jwt_decode(token);

  // If the 'exp' field does not exist, assume the token does not expire
  if (decoded?.exp == null) {
    return false;
  }

  const now: number = Date.now() / 1000;
  return decoded.exp < now;
}

export default Login;
