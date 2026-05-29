import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({

  baseURL:
    // "http://127.0.0.1:8000/api/",
    import.meta.env.VITE_API_URL,

});


// REQUEST INTERCEPTOR
// Automatically attach access token

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "access"
      );

    // Do not attach token
    // to refresh endpoint

    if (

      token
      &&
      !config.url.includes(
        "token/refresh/"
      )

    ) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);




// RESPONSE INTERCEPTOR
// Auto refresh access token

api.interceptors.response.use(

  // If response successful
  (response) => response,

  // If response error
  async (error) => {

    const originalRequest =
      error.config;

    // Refresh ONLY when:
    // 1. status is 401
    // 2. token invalid
    // 3. request not retried already
    // 4. not refresh endpoint

    if (

      error.response?.status === 401

      &&

      error.response?.data?.code ===
        "token_not_valid"

      &&

      !originalRequest._retry

      &&

      !originalRequest.url.includes(
        "token/refresh/"
      )

    ) {

      // Prevent infinite retry loop

      originalRequest._retry = true;

      try {

        // Get refresh token

        const refreshToken =
          localStorage.getItem(
            "refresh"
          );

        // If refresh token missing

        if (!refreshToken) {

          localStorage.removeItem(
            "access"
          );

          localStorage.removeItem(
            "refresh"
          );

          window.location.replace(
            "/login"
          );

          return Promise.reject(
            error
          );
        }

        // Send refresh token
        // to backend

        const response =
          await axios.post(

            // "http://127.0.0.1:8000/api/token/refresh/",
            `${import.meta.env.VITE_API_URL}/token/refresh/`,

            {
              refresh:
                refreshToken,
            }
          );

        // New access token

        const newAccess =
          response.data.access;

        // Save new access token

        localStorage.setItem(

          "access",

          newAccess
        );

        // Update failed request
        // with new token

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        // Retry original request

        return api(
          originalRequest
        );

      } catch (refreshError) {

        console.log(
          "Refresh Failed",
          refreshError.response
        );

      

        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        // Redirect login

        window.location.replace(
          "/login"
        );

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;