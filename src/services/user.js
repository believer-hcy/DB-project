import { LOGIN } from '@/services/api'
import axios from 'axios'

/**
 * 登录服务
 * @param {string} username 账户名
 * @param {string} password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export function login(username, password) {
  return axios.post(LOGIN, {username, password});  // 使用登录接口的地址
}


export const register = (userData) => {
  return axios.post('/api/register', userData);
};

/**
 * 获取路由配置
 * @returns {Promise<AxiosResponse<T>>}
 */
// export async function getRoutesConfig() {
//   return axios.get(`/api/routes`);  // 获取路由配置
// }

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
  // Remove authorization tokens if needed
}

export default {
  login,
  logout,
};
