export const getStoredToken = () => {
  try {
    const persistData = localStorage.getItem("persist:auth");
    if (persistData) {
      const authData = JSON.parse(persistData);
      return JSON.parse(authData.token);
    }
    return null;
  } catch (error) {
    console.error("Error getting stored token:", error);
    return null;
  }
};

export const setStoredToken = (token) => {
  try {
    const persistData = localStorage.getItem("persist:auth") || "{}";
    const authData = JSON.parse(persistData);
    authData.token = JSON.stringify(token);
    localStorage.setItem("persist:auth", JSON.stringify(authData));
  } catch (error) {
    console.error("Error setting stored token:", error);
  }
};

export const clearStoredAuth = () => {
  try {
    localStorage.removeItem("persist:auth");
    localStorage.removeItem("persist:books");
  } catch (error) {
    console.error("Error clearing stored auth:", error);
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime + 300;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

export const shouldRefreshToken = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp < currentTime + 600;
  } catch (error) {
    console.error("Error checking if token should be refreshed:", error);
    return false;
  }
};
