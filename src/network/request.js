import axios from "axios";

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/v1',
    timeout: 5000
  });
  //2.axios拦截器
  instance.interceptors.request.use((config) => {
    return config;
  }, error => {
    console.log(error);
  });
  instance.interceptors.response.use((res) => {
    return res.data;
  }, error => {
    console.log(error);
  });

  return instance(config);
}
