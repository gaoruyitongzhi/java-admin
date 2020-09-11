/**
 * 定义要请求的Api
 */
import request from '@/utils/request' //使用 ES6 中的 import 导入模块

const api_name = '/copyright/customer' //定义跨域后端路径

export default {
  // ## 动态条件查询带分页
  findPageCustomer(pageNo, pageSize, customerQuery) {
    return request({
      url: `${api_name}/${pageNo}/${pageSize}`,
      method: 'post',
      data: customerQuery
    })
  },
  deleteCustomerById(customerId){
    return request({
      url:`${api_name}/deleteCustomer/${customerId}`,
      method:'delete'
    })
  },
  saveCustomer(customer){
    return request ({
      url:`${api_name}/saveCustomer`,
      method:'post',
      data:customer
    })
  },
  getCustomerById(customerId){
    return request ({
      url:`${api_name}/getCustomerById/${customerId}`,
      method:'get'
    })
  }
}
