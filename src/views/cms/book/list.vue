<template>
  <div id="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item  label="书名">
        <el-input v-model="bookQuery.title" placeholder="书名" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="bookQuery.author" placeholder="作者" />
      </el-form-item>
      <el-form-item label="连载">
        <el-select v-model="bookQuery.serialize" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="bookQuery.status" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原创">
        <el-select v-model="bookQuery.original" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="授权开始时间">
        <el-date-picker
          v-model="bookQuery.gmtCreate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="bookQuery.gmtModified"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" @click="getFindPageBook()">查询</el-button>
      <el-button type="primary" @click="resetData()">清空</el-button>
      <router-link :to="'/cms/book/create'">
        <el-button type="primary">添加书籍</el-button>
      </router-link>
    </el-form>
    <!-- 列表 -->
    <el-table :data="bookList" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="书籍ID" width="80" />
      <el-table-column prop="title" label="书名"/>
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="firstSort" label="一级分类" />
      <el-table-column prop="secondary" label="二级分类" />
      <el-table-column label="连载">
        <template slot-scope="scope">
          {{ scope.row.serialize === 1 ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column prop="workNumber" label="字数" />
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '上线' : '未上线'}}
        </template>
      </el-table-column>
      <el-table-column label="全本收费">
        <template slot-scope="scope">
          {{ scope.row.fullCost === 1 ? '收费' : '免费' }}
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="授权开始时间" />
      <el-table-column prop="gmtModified" label="授权结束时间" />
      <el-table-column label="原创">
        <template slot-scope="scope">
          {{ scope.row.original === 1 ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="授权状态">
<!--        <template slot-scope="scope">-->
<!--          {{ currentTime > scope.row.endTime ? '过期' : '有效' }}-->
<!--        </template>-->
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteBook(scope.row.id, scope.row.status)">删除</el-button>
          <router-link :to="'/cms/book/update/'+scope.row.id">
            <el-button type="primary" size="mini" >修改</el-button>
          </router-link>
          <el-button v-if="scope.row.status === 0" type="danger" size="mini" icon="el-icon-delete" @click="upOrDownBook(scope.row.id, 1)">上架书籍</el-button>
          <el-button v-else type="danger" size="mini" @click="upOrDownBook(scope.row.id, 0)">下架书籍</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="pageSize"
      :current-page="pageNo"
      :total="total"
      :pager-count="5"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getFindPageBook">
    </el-pagination>
  </div>
</template>

<script>
  import book from '@/api/cms/book'

  export default {
    data (){ // 定义变量和初始值
      return{
        bookList:null,//数据列表
        bookQuery:{},//查询条件封装对象
        total:0,//总记录数
        pageNo:1,//页码
        pageSize:5,// 每页显示条数
        currentTime:'',//当前时间
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        options2: [{
          value: '1',
          label: '上线'
        }, {
          value: '0',
          label: '未上线'
        }],
        value: ''
      }
    },
    created() {//在页面渲染之前，一般先调用methods定义的方法
      this.getFindPageBook();
    },
    methods:{ //创建具体的方法，调用book.js定义的方法
      //查询
      getFindPageBook(pageNo = 1){//带分页的条件查询
        this.pageNo = pageNo
        book.findPageBook(this.pageNo, this.pageSize, this.bookQuery)
          .then(response =>{
            this.bookList = response.data.items;
            this.total = response.data.total
          })
        },
      resetData(){//清空查询框内的数据
        //清空所有查询框的值
        this.bookQuery={}
        //重新查询所有的数据
        this.getFindPageBook()
      },
      deleteBook(bookId, state) { // ## 删除书籍
        if (state === 1) {
          this.$message({
            type: 'error',
            message: '上线书籍不允许删除!'
          })
          return
        }
        this.$confirm('此操作将永久删除该书籍记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          book.deleteById(bookId)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getFindPageBook()//删除文件之后刷新页面
            })
        })
      },
      upOrDownBook(bookId, status) { // ## 设置书籍上下架
        this.$confirm('此操作将改变书籍上下线记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          book.upOrDownBook(bookId, status)
            .then(response => {
              this.$message({
                type: 'success',
                message: '设置成功!'
              })
              this.getFindPageBook()//删除文件之后刷新页面
            })
        })
      }

      }
  }
</script>
