import axios from 'axios';

/**
 * 登录服务
 * @param {string} username 账户名
 * @param {string} password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(username, password) {
  try {
    // 检查响应是否成功
    if (response.data.code === 200) {
      return {
        success: true,
        message: response.data.message,
        token: token
      };
    } else {
      return {
        success: false,
        message: response.data.message || '账户名或密码错误'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: '登录请求失败，请稍后再试'
    };
  }
}

/**
 * 获取路由配置
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getRoutesConfig() {
  try {
    const response = await axios.get(`/api/routes`);  // 使用代理后的路径
    console.log('Routes config response:', response);  // 打印路由配置响应
    return response.data;
  } catch (error) {
    console.error('获取路由配置失败', error);
    if (error.response) {
      console.log('Error response data:', error.response.data);
      console.log('Error response status:', error.response.status);
    }
  }
}

export default {
  login,
  getRoutesConfig
};
