<template>
  <div class="about">
    <h1>{{ id ? '修改' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { VueEditor } from 'vue2-editor'
@Component({
  components: {
    VueEditor
  }
})
export default class ArticlesEdit extends Vue {
  @Prop({ type: String }) id

  declare model: {}
  declare categories: []

  data () {
    return {
      model: {},
      categories: []
    }
  }

  // 自己处理富文本的文件上传
  async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
    const formData = new FormData()
    formData.append('file', file)

    const result = await this.$http.post('upload', formData)
    Editor.insertEmbed(cursorLocation, 'image', result.data.url)
    resetUploader()
  }

  async save () {
    if (this.id) {
      await this.$http.put(`rest/articles/${this.id}`, this.model)
    } else {
      await this.$http.post('rest/articles', this.model)
    }
    this.$message({
      type: 'success',
      message: '保存成功'
    })
    this.$router.push('/articles/list')
  }

  async fetch () {
    const result = await this.$http.get(`/rest/articles/${this.id}`)
    this.model = result.data
  }

  // 获取分类
  async fetchCategories () {
    const result = await this.$http.get('/rest/categories')

    this.categories = result.data
  }

  created () {
    this.fetchCategories()
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
