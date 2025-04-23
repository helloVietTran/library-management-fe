import Cookies from "js-cookie";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const setAuthCookies = ({ accessToken, refreshToken }: Tokens): void => {
  Cookies.set("lib_jwt_token", accessToken, { expires: 30 / (24 * 60) }); // 30 phút
  Cookies.set("lib_refresh_token", refreshToken, { expires: 2 });
};

export const removeAuthCookies = (): void => {
  Cookies.remove("lib_jwt_token");
  Cookies.remove("lib_refresh_token");
};