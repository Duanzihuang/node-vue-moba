<template>
  <div class="about">
    <h1>{{ id ? '修改' : '新建' }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
export default class ItemsEdit extends Vue {
  @Prop({ type: String }) id

  declare model: {}

  data () {
    return {
      model: {}
    }
  }

  async save () {
    if (this.id) {
      await this.$http.put(`rest/admin_users/${this.id}`, this.model)
    } else {
      await this.$http.post('rest/admin_users', this.model)
    }
    this.$message({
      type: 'success',
      message: '保存成功'
    })
    this.$router.push('/admin_users/list')
  }

  async fetch () {
    const result = await this.$http.get(`/rest/admin_users/${this.id}`)
    this.model = result.data
  }

  created () {
    this.id && this.fetch()
  }
}
</script>
