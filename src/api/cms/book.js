//定义出要请求的api
import request from '@/utils/request'

const api_name = '/cms/book'

export default {
  // ## 定义要调用的API
  findPageBook(pageNo,pageSize,bookQuery){ //带分页的条件查寻
    return request({
      url:`${api_name}/${pageNo}/${pageSize}`,//拼接地址
      method:'post',//指定请求方式
      data:bookQuery
    })
  },
  // ## 添加书籍
  saveBook(book) {
    return request({
      url: `${api_name}/saveBook`,
      method: 'post',
      data: book
    })
  },
  getBookById(bookId){//回显要修改的数据
    return request ({
      url:`${api_name}/getBookById/${bookId}`,
      method:'get'
    })
  },
  updateBook(book){//修改
    console.log(book)
    return request ({
      url:`${api_name}/updateBook`,
      method:'put',
      data:book
    })
  },
  deleteById(bookId) {
    return request({
      url: `${api_name}/deleteById/${bookId}`,
      method: 'delete'
    })
  },
  // ## 设置书籍上下架
  upOrDownBook(bookId, status) {
    return request({
      url: `${api_name}/${bookId}/${status}`,
      method: 'put'
    })
  }

}
