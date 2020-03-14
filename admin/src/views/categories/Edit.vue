<template>
  <div class="about">
    <h1>{{id ? '修改' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
export default class CategoriesEdit extends Vue {
  @Prop({ type: String }) id

  declare model: {}
  declare parents: []

  data () {
    return {
      model: {
        parent: null
      },
      parents: []
    }
  }

  async save () {
    if (this.id) {
      await this.$http.put(`rest/categories/${this.id}`, this.model)
    } else {
      await this.$http.post('rest/categories', this.model)
    }
    this.$message({
      type: 'success',
      message: '保存成功'
    })
    this.$router.push('/categories/list')
  }

  async fetch () {
    const result = await this.$http.get(`/rest/categories/${this.id}`)
    this.model = result.data
  }

  async fetchParents () {
    const result = await this.$http.get('/rest/categories')

    this.parents = result.data
  }

  created () {
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
