<template>
  <div id="app-container">
    <el-form label-width="130px">
      <el-form-item label="书名">
        <el-col :span="5">
          <el-input v-model="book.title"/>
        </el-col>
      </el-form-item>
      <el-form-item label="作者">
        <el-col :span="5">
          <el-input v-model="book.author"/>
        </el-col>
      </el-form-item>
      <!-- TODO 分类 -->
      <!-- TODO 版权 -->
      <el-form-item label="授权开始时间">
        <el-date-picker
          v-model="book.gmtCreate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="授权结束时间">
        <el-date-picker
          v-model="book.gmtModified"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="连载">
        <el-select v-model="book.serial" clearable placeholder="请选择">
          <el-option :value="1" label="是"/>
          <el-option :value="0" label="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="全本收费">
        <el-select v-model="book.fullCost" clearable placeholder="请选择">
          <el-option :value="1" label="收费"/>
          <el-option :value="0" label="免费"/>
        </el-select>
      </el-form-item>
      <el-form-item label="原创">
        <el-select v-model="book.original" clearable placeholder="请选择">
          <el-option :value="1" label="是"/>
          <el-option :value="0" label="否"/>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="简介">-->
<!--        <el-input v-model="book.info" :rows="10" type="textarea"/>-->
<!--      </el-form-item>-->
      <!-- TODO 书封 -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveBook()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import book from '@/api/cms/book'

  export default {
    data() {
      return {
        book: {},
        saveBtnDisabled: false, // ##不禁用保存按钮
        // BASE_API: process.env.VUE_APP_BASE_API
      }
    },
    created() {

    },
    methods: {
      saveBook() {
        this.saveBtnDisabled = true // ##禁用保存按钮
        book.saveBook(this.book)
          // .then执行成功之后执行的方法
          .then(response => {
            // ## 提示信息
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            // ## 添加完成之后 回到list页面,重定向功能
            this.$router.push('/cms/book/list')
          })
      }
    }
  }
</script>
