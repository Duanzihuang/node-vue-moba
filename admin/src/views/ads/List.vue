<template>
  <div>
    <h1>广告位列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="280"> </el-table-column>
      <el-table-column prop="name" label="广告名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="$router.push(`/ads/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
export default class AdsList extends Vue {
  declare items

  data () {
    return {
      items: []
    }
  }

  async fetch () {
    const result = await this.$http.get('rest/ads')
    this.items = result.data
  }

  // 删除
  remove (row) {
    this.$confirm(`确定删除广告 ${row.name} ?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await this.$http.delete(`/rest/ads/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.fetch()
      })
      .catch(err => {
        console.log(err)
      })
  }

  created () {
    this.fetch()
  }
}
</script>
