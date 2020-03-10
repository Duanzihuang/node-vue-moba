<template>
  <div class="about">
    <h1>{{ id ? '修改' : '新建' }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  @Prop({ type: String }) id: string

  declare model: Record<string, any>
  declare parents

  data () {
    return {
      model: {}
    }
  }

  afterUpload (res) {
    this.$set(this.model, 'icon', res.url)
  }

  async save () {
    if (this.id) {
      await this.$http.put(`rest/items/${this.id}`, this.model)
    } else {
      await this.$http.post('rest/items', this.model)
    }
    this.$message({
      type: 'success',
      message: '保存成功'
    })
    this.$router.push('/items/list')
  }

  async fetch () {
    const result = await this.$http.get(`/rest/items/${this.id}`)
    this.model = result.data
  }

  created () {
    this.id && this.fetch()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
