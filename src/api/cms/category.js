import request from '@/utils/request'

const api_name = '/cms/category'

export default {
  // ## 获取树形分类数据
  getCategoryList() {
    return request({
      url: `${api_name}`,
      method: 'get'
    })
  }
}
