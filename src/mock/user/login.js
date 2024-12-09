import axios from 'axios';

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
  getRoutesConfig
};
