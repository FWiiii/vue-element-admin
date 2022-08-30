import axios from "axios";
import { getToken } from "@/utils/useStorage";
import { baseURL, timeout } from "@/config/req";
import { router } from "@/router";

let loadingInstance;

const service = axios.create({
  baseURL,
  timeout,
  headers: {},
});

const WITHOUT_TOKEN_API = [{ url: "/auth/login", method: "POST" }];

function isWithoutToken({ url, method = "" }) {
  return WITHOUT_TOKEN_API.some(
    (item) => item.url === url && item.method === method.toUpperCase()
  );
}

// 请求前的统一处理
service.interceptors.request.use(
  (config) => {
    if (config.loading) {
      loadingInstance = ElLoading.service();
    }
    // JWT鉴权处理

    if (isWithoutToken(config)) {
      return config;
    }

    const token = getToken();

    if (!token) {
      // * 未登录或者token过期的情况下,跳转登录页重新登录
      router.replace({
        path: "/login",
        query: {
          ...router.currentRoute.value.query,
          redirect: router.currentRoute.value.path,
        },
      });
      return Promise.reject({ code: "-1", message: "未登录" });
    }

    if (config.headers) {
      config.headers.Authorization =
        config.headers.Authorization || "Bearer " + token;
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  //   if (loadingInstance) {
  //     loadingInstance.close();
  //   }
  //   if (response.config.closeResponseInterceptors) {
  //     return response;
  //   }
  //   const res = response.data;
  //   if (res.code === "00000") {
  //     return res.data;
  //   } else {
  //     showError(res);
  //     return Promise.reject(res);
  //   }
  // },
  // (error) => {
  //   if (loadingInstance) {
  //     loadingInstance.close();
  //   }
  //   let { code, msg: message } = error.response.data;
  //   showError({ code, message });
  //   return Promise.reject(error.response);
  return response;
});

function showError(error) {
  if (error.code === 403) {
    // to re-login
    // store.dispatch('user/loginOut')
  } else {
    ElMessage({
      message: error.message || "服务异常",
      type: "error",
      duration: 3 * 1000,
    });
  }
}

export default service;
