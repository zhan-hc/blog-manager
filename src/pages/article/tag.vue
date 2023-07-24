<template>
  <div>
    <div class="top">
      <el-input
        v-model="input1"
        style="width: 200px;"
        size="large"
        placeholder="Please Input"
      >
      <template #suffix>
        <i-ep-search style="font-size: 12px;"></i-ep-search>
      </template>
      </el-input>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button
              link
              type="primary"
              size="small"
            >
              delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
const input1 = ref('')

const tableData = ref ([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])
</script>

<style scoped lang='scss'>
  
</style>