<template>
  <div class="table-box">
    <el-form inline>
      <el-form-item label="埋点名称">
        <el-input v-model="searchData.event_name" placeholder="请输入埋点名称" />
      </el-form-item>
      <el-form-item label="app名称">
        <el-input v-model="searchData.app_name" placeholder="请输入app名称" />
      </el-form-item>
      <el-form-item label="appCode">
        <el-input v-model="searchData.app_code" placeholder="请输入appCode" />
      </el-form-item>
      <el-form-item label="pageId">
        <el-input v-model="searchData.page_id" placeholder="请输入pageId" />
      </el-form-item>
      <el-form-item label="userId">
        <el-input v-model="searchData.user_id" placeholder="请输入userId" />
      </el-form-item>
      <el-form-item label="deviceId">
        <el-input v-model="searchData.device_id" placeholder="请输入deviceId" />
      </el-form-item>
      <el-form-item label="埋点类型">
        <el-input v-model="searchData.event_type" placeholder="请输入埋点类型" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="getDataList">查询</el-button>
        <el-button type="success" @click="clearSearchData">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"/>
      <el-table-column prop="app_name" label="app名称"  width="100"/>
      <el-table-column prop="app_code" label="appCode"  width="100"/>
      <el-table-column prop="app_version" label="appVersion" />
      <el-table-column prop="user_id" label="userId" />
      <el-table-column prop="page_id" label="pageId" width="180"/>
      <el-table-column prop="device_id" label="device_id" width="180"/>
      <el-table-column prop="event_name" label="埋点名称" />
      <el-table-column prop="event_type" label="埋点类型" />
      <el-table-column prop="client_time" label="客户端上报时间" width="180">
        <template #default="scope">
          <span v-if="scope.row.client_time">{{ formatDate(scope.row.client_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="server_time" label="服务端到达时间" width="180" >
        <template #default="scope">
          <span v-if="scope.row.server_time">{{ formatDate(scope.row.server_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="event_msg" label="埋点异常等信息" width="150">
        <template #default="scope">
          <el-button type="primary" @click="setDialogInfo(scope.row.event_msg)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="event_info" label="埋点事件信息" width="150">
        <template #default="scope">
          <el-button type="primary" @click="setDialogInfo(scope.row.event_info)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="base_info" label="基础信息" width="150">
        <template #default="scope">
          <el-button type="primary" @click="setDialogInfo(scope.row.base_info)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
    v-model="dialogVisible"
    title="info"
    width="500"
  >
  <div class="line" v-for="(item, _index) in dialogInfo" :key="item[0]">
    <span>{{ item[0] }}：</span>
    <span>{{ item[1] }}</span>
  </div>
    
  </el-dialog>
    <el-pagination background layout="prev, pager, next" :total="pageData.total" v-model:page-size="pageData.pageSize"
      v-model:current-page="pageData.pageNo" @update:current-page="handleGetData"
      @update:page-size="handleGetData" />
  </div>
</template>

<script lang='ts' setup>
import { getEventList } from "@/api/event";
import { formatDate } from '@/utils/date'
import usePopover from '@/hook/common/usePopover'
import useTableData from "@/hook/common/useTableData";
import { ref, onMounted, reactive } from "vue";

const dialogInfo = ref<string[][]>([])
const dialogVisible = ref(false)
const searchData: any = ref({
  event_name: '',
  app_name: '',
  app_code: '',
  page_id: '',
  user_id: '',
  device_id: '',
  event_type: ''
})
const { tableData, pageData, handleGetData, initPageParams, refreshSearchData } = useTableData({
  fetchApi: getEventList
})

const setDialogInfo = (data: any) => {
  if(data)  {
    let temDialogInfo = JSON.parse(data)
    dialogInfo.value = Object.keys(temDialogInfo).map(key => {
    return [key, temDialogInfo[key] || '']
    }) 
  }else {
    dialogInfo.value = []
  }
 
  dialogVisible.value = true
}

const clearSearchData = () => {
  searchData.value = {
    event_name: '',
    app_name: '',
    app_code: '',
    page_id: '',
    user_id: '',
    device_id: '',
    event_type: ''
  }
  refreshSearchData(searchData.value)
}
const getDataList = async () => {
  refreshSearchData(searchData.value)
  await handleGetData()
}

</script>

<style scoped lang='scss'>
  .table-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-dialog {
    .line {
      margin-bottom: 10px;
      span:nth-child(1) {
        margin-right: 10px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
</style>