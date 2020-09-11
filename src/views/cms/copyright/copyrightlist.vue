<template>

  <div id="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="">
      </el-form-item>
      <el-form-item label="版权列表">
      </el-form-item>
    </el-form>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="版权名">
        <el-input v-model="copyrightQuery.copyrightName" placeholder="版权名" />
      </el-form-item>
      <el-form-item label="公司名">
        <el-input v-model="copyrightQuery.companyName" placeholder="公司名" />
      </el-form-item>
      <el-form-item label="备注名">
        <el-input v-model="copyrightQuery.noteName" placeholder="备注名" />
      </el-form-item>
      <el-button type="primary" @click="getFindPageCopyright()">查询<i class="el-icon-search el-icon--right"></i></el-button>
      <el-button type="primary" @click="resetData()">清空<i class="el-icon-refresh el-icon--right"></i></el-button>
      <el-button type="primary" @click=openAdd()>添加版权<i class="el-icon-circle-plus el-icon--right"></i></el-button>
      <el-dialog title="添加版权" :visible.sync="dialogFormVisible">
        <el-form :model="copyright">
          <el-form-item label="版权名" :label-width="formLabelWidth">
            <el-input v-model="copyright.copyrightName" placeholder="版权名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司名" :label-width="formLabelWidth">
            <el-input v-model="copyright.companyName" placeholder="公司名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注名" :label-width="formLabelWidth">
            <el-input v-model="copyright.noteName" placeholder="备注名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="合作状态" :label-width="formLabelWidth">
            <el-select v-model="copyright.cooperationStatus" placeholder="请选择合作状态">
              <el-option label="生效" value="1"></el-option>
              <el-option label="失效" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版权简介" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="copyright.copyrightIntroduce" placeholder="版权简介" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exit()">取 消</el-button>
          <el-button type="primary" @click="saveCopyright()">确 定</el-button>
        </div>
      </el-dialog>

    </el-form>
    <!-- 列表 -->
    <el-table :data="copyrightlist" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="copyrightName" label="版权名"/>
      <el-table-column prop="companyName" label="公司名" />
      <el-table-column prop="noteName" label="备注名" width="150"/>
      <el-table-column prop="" label="上线数量" width="110"/>
      <el-table-column prop="" label="未上线数量" width="110"/>
      <el-table-column prop="" label="即将过期数量" width="120"/>
      <el-table-column label="合作状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.cooperationStatus === 1 ? '生效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteCopyright(scope.row.id, scope.row.cooperationStatus)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
          <el-button type="primary" size="mini" @click="getCopyrightById(scope.row.id)">修改<i class="el-icon-edit el-icon--right"></i></el-button>
          <router-link :to="'/copyright/customer/list/'">
            <el-button type="danger" size="mini">管理客户<i class="el-icon-share el-icon--right"></i></el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import copyright from '@/api/copyright/copyright'

  export default {
    data() {
      return {
        copyrightlist: [],
        copyrightQuery: { // ##查询条件封装对象
        },
        copyright: {
          copyrightName: '',
          companyName: '',
          noteName: '',
          cooperationStatus: '',
          copyrightIntroduce: ''
        },
        total: 0, // ## 总记录数
        pageNo: 1, // ## 页码
        pageSize: 5, // ## 每页显示记录数
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    created() {
      this.getFindPageCopyright()
    },
    methods: { // ## 创建具体的方法,调用 copyright.js 定义的方法
      getFindPageCopyright(pageNo = 1) {
        this.pageNo = pageNo
        copyright.findPageCopyright(this.pageNo, this.pageSize, this.copyrightQuery)
          .then(response => {
            this.copyrightlist = response.data.items
            this.total = response.data.total
            // this.currentTime = this.format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          })
      },
      resetData() { // ## 清空方法
        // ##清空所有值
        this.copyrightQuery = {}
        // ##查询所有数据
        this.getFindPageCopyright()
      },
      deleteCopyright(copyrightId, cooperationStatus) {
        if (cooperationStatus === 1) {
          this.$message({
            type: 'error',
            message: '合作生效中，不允许删除！'
          })
          return
        }
        this.$confirm('此操作将永久删除该信息，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          copyright.deleteCopyrightById(copyrightId)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getFindPageCopyright()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //打开添加版权窗口
      openAdd() {
        this.copyright={}
        this.dialogFormVisible = true
      },
      // 添加版权
      saveCopyright() {
        copyright.saveCopyright(this.copyright)
          .then(response => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '保存成功！'
            })
            this.dialogFormVisible = false
            this.getFindPageCopyright()
          })
      },
      exit() {
        this.$message({
          type: 'info',
          message: '取消保存！'
        })
        this.dialogFormVisible = false
      },
      getCopyrightById(copyrightId) {
        copyright.getCopyrightById(copyrightId)
          .then(response => {
            this.copyright = response.data.copyright
          })
        this.dialogFormVisible = true
      }
    }
  }
</script>

