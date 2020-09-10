import request from '@/utils/request'

const api_name = '/copyright'

export default {
  // ## 动态条件查询带分页
  findPageCopyright(pageNo, pageSize, CopyrightQuery) {
    return request({
      url: `${api_name}/${pageNo}/${pageSize}`,
      method: `post`,
      data: CopyrightQuery
    })
  },
  // ## 根据id删除版权
  deleteCopyrightById(copyrightId) {
    return request({
      url: `${api_name}/deleteById/${copyrightId}`,
      method: `delete`
    })
  },
  // 添加版权信息
  saveCopyright(copyright) {
    return request({
      url: `${api_name}/saveCopyright`,
      method: 'post',
      data: copyright
    })
  },
  // 修改版权信息
  update(copyright) {
    return request({
      url: `${api_name}/updateCopyright`,
      method: 'put',
      data: copyright
    })
  },
  // 根据Id得到copyright信息
  getCopyrightById(copyrightId) {
    return request({
      url: `${api_name}/getCopyrightById/${copyrightId}`,
      method: 'get'
    })
  }
}
