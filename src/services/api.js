// //跨域代理前缀
// // const API_PROXY_PREFIX='/api'
// // const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
// module.exports = {
//   LOGIN: `${BASE_URL}/login`,
//   ROUTES: `${BASE_URL}/routes`,
//   GOODS: `${BASE_URL}/goods`,
//   GOODS_COLUMNS: `${BASE_URL}/columns`,
// }



const BASE_URL = '/api';  // 使用代理后的 API 路径

module.exports = {
  LOGIN: `${BASE_URL}/user/login`,  // 后端登录接口路径
  ROUTES: `${BASE_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`
}
