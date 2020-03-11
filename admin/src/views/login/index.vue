<template>
    <div class="login-container">
        <el-card class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button native-type="submit" style="width:100%;" type='primary'>登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class Login extends Vue {
  data () {
    return {
      model: {}
    }
  }

  async login () {
    const res = await this.$http.post('login', this.model)
    if (res.status === 200) {
      localStorage.token = res.data
      this.$message({
        type: 'success',
        message: '登录成功'
      })
      this.$router.push('/')
    }
  }
}
</script>

<style>
.login-container{
    width: 100%;
}
.login-card{
    width: 35%;
    margin: 8rem auto;
}
</style>
