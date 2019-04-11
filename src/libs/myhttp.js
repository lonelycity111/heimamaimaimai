// 导入axios
import axios from 'axios'
// 设置axios的基础地址方便后续编码
axios.defaults.baseURL = 'http://111.230.232.110:8899'

// let myhttp = {
//   install(Vue){
//     Vue.prototype.$http = axios;
//   }
// }

// export default {
//   myhttp
// }

//简写 
export default {
  install(Vue){
    Vue.prototype.$http = axios;
  }
}