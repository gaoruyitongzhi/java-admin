<template>

  <div id="app-container">
    <el-form label-width="130px">
      <!--    <el-form-item label="选择版权">-->
      <!--      <el-col :span="5">-->
      <!--        <el-input v-model="customer."/>-->
      <!--      </el-col>-->
      <!--    </el-form-item>-->
      <el-form-item label="姓名">
        <el-col :span="5">
          <el-input v-model="customer.iname"/>
        </el-col>
      </el-form-item>
      <el-form-item label="职务">
        <el-select v-model="customer.ipost" clearable placeholder="请选择">
          <el-option :value="1" label="商务经理"/>
          <el-option :value="2" label="商务助理"/>
          <el-option :value="3" label="业务助理"/>
          <el-option :value="4" label="媒体运营"/>
          <el-option :value="5" label="专业写手"/>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="customer.igender" clearable placeholder="请选择">
          <el-option :value="1" label="男"/>
          <el-option :value="0" label="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="customer.idateBirth"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="5">
          <el-input v-model="customer.iphone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="座机号">
        <el-col :span="5">
          <el-input v-model="customer.itelephone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="QQ">
        <el-col :span="5">
          <el-input v-model="customer.iqq"/>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="5">
          <el-input v-model="customer.iemali"/>
        </el-col>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-col :span="5">
          <el-input v-model="customer.companyAddress"/>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="customer.iremarks" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveCustomer()">添加</el-button>
        <router-link :to="'/copyright/customer/list'">
          <el-button type="primary">返回</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>

  import customer from '@/api/copyright/customer/customer'

  export default {
    data() {
      return {
        customer: {},
        saveBtnDisabled: false, // ##不禁用保存按钮
        // BASE_API: process.env.VUE_APP_BASE_API
      }
    },
    created() {
      this.init()
    },
    methods: {
      init(){ //初始化
        if (this.$route.params && this.$route.params.id){
          //从路径中获取id值
          const id = this.$route.params.id
          this.getCustomerById(id)
        }

      },
      saveCustomer() {
        this.saveBtnDisabled = true // ##禁用保存按钮
        customer.saveCustomer(this.customer)
          .then(response => {
            // ## 提示信息
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            // ## 回到list页面,重定向功能
            this.$router.push('/copyright/customer/list')
          })
      },
      getCustomerById(id){
        customer.getCustomerById(id)
           .then( response =>{
             this.customer = response.data.customer
           })
      }
    }
  }
</script>

<style scoped>

</style>
