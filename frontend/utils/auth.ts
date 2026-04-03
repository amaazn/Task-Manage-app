export const saveAuth = (token: string, name: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userName", name);
  }
};

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
  }
};

export const getUserName = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userName");
  }
  return null;
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("accessToken");
  }
  return false;
};











// export const saveAuth = (token: string, name: string) => {
//   localStorage.setItem("accessToken", token);
//   localStorage.setItem("userName", name);
// };

// export const logoutUser = () => {
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("userName");
// };

// export const getUserName = () => {
//   return localStorage.getItem("userName");
// };

// export const getToken = () => {
//   return localStorage.getItem("accessToken");
// };

// export const isAuthenticated = () => {
//   return !!localStorage.getItem("accessToken");
// };