<template>
  <div class="about">
    <h1>{{ id ? '修改' : '新建' }}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})" type="primary" size="mini" plain>
          <el-icon class="el-icon-plus"></el-icon>
          添加广告
        </el-button>
        <el-row>
          <el-col v-for="(item,index) in model.items" :key="index" :span="24">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:.5rem;" label="图片">
              <el-upload
                class="avatar-uploader"
                list-type="picture-card"
                :action="uploadUrl"
                :headers="getAuthHeader()"
                :on-success="res => $set(item,'image',res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="danger" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
export default class AdsEdit extends Vue {
  @Prop({ type: String }) id: string

  declare model: Record<string, any>

  data () {
    return {
      model: {
        items: []
      }
    }
  }

  afterUpload (res) {
    this.$set(this.model, 'icon', res.url)
  }

  async save () {
    if (this.id) {
      await this.$http.put(`rest/ads/${this.id}`, this.model)
    } else {
      await this.$http.post('rest/ads', this.model)
    }
    this.$message({
      type: 'success',
      message: '保存成功'
    })
    this.$router.push('/ads/list')
  }

  async fetch () {
    const result = await this.$http.get(`/rest/ads/${this.id}`)
    this.model = result.data
  }

  created () {
    this.id && this.fetch()
  }
}
</script>

<style scoped>
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
  min-width: 100%;
  height: 100%;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
