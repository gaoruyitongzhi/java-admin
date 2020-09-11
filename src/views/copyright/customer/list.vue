<template>
      <div id="app-container" >
        <!-- 查询表单 -->
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="customerQuery.copyrightName" placeholder="版权名" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="customerQuery.iname" placeholder="姓名" />
          </el-form-item>

          <el-button type="primary" @click="getFindPageCustomer()">查询</el-button>
          <el-button type="primary" @click="resetData()">清空</el-button>

          <router-link :to="'/copyright/customer/insert/'">
            <el-button type="primary">添加客户</el-button>
          </router-link>
        </el-form>
      <el-table :data="customerList"  fit highlight-current-row >
        <el-table-column prop="id" label="客户ID" width="80" align="center"/>
        <el-table-column prop="copyrightName" label="版权名" align="center" />
        <el-table-column prop="iname" label="姓名" align="center"/>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            {{ scope.row.igender === 1 ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column prop="idateBirth" label="出生日期" align="center"/>
        <el-table-column prop="ipost" label="职务" align="center"/>
        <el-table-column prop="iphone" label="手机号码" align="center"/>
        <el-table-column prop="itelephone" label="座机号码" align="center"/>
        <el-table-column prop="iemali" label="邮箱" align="center" width="180"/>
        <el-table-column prop="iqq" label="QQ" align="center"/>
        <el-table-column prop="companyAddress" label="公司地址" align="center"/>
        <el-table-column prop="iremarks" label="备注" align="center"/>

        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteCustomer(scope.row.id)">删除</el-button>

            <router-link :to="'/copyright/customer/update/'+scope.row.id">
              <el-button type="primary" size="mini">修改</el-button>
            </router-link>

          </template>
        </el-table-column>

      </el-table>
    <el-pagination
      :page-size="pageSize"
      :current-page="pageNo"
      :total="total"
      :pager-count="5"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getFindPageCustomer">
    </el-pagination>

  </div>
</template>

<script>
  import customer from '@/api/copyright/customer/customer' //模块化引进

  export default {
    data() { // ## 定义变量和初始值
      return {
        customerList: [], // ## 数据列表
        customerQuery: {}, // ##查询条件封装对象
        total: 0, // ## 总记录数
        pageNo: 1, // ## 页码
        pageSize: 5, // ## 每页显示记录数
        currentTime: '' // ## 当前时间
      }
    },
    created() { // ## 在页面渲染之前,一般先调用methods定义的方法
      this.getFindPageCustomer()
    },
    methods: { // ## 创建具体的方法,调用 book.js 定义的方法
      getFindPageCustomer (pageNo = 1) {
        this.pageNo = pageNo
        customer.findPageCustomer(this.pageNo,this.pageSize,this.customerQuery)
          .then( response => {
            this.customerList = response.data.items //items为后台传参
            this.total = response.data.total
            this.currentTime = this.format(new Date(),'yyyy-MM-dd HH:mm:ss')
          })
      },resetData() {//清空查询框内的数据
        //清空所有查询框的值
        this.customerQuery = {}
        //重新查询所有的数据
        this.getFindPageCustomer()
      },

      deleteCustomer(customerId){
        this.$confirm('此操作将删除该客户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() =>{
          customer.deleteCustomerById(customerId)
            .then(response => {
              this.$message({
                type:'success',
                message:'删除成功'
              })
              this.getFindPageCustomer()
            })
        })
      }
    }
  }
</script>
