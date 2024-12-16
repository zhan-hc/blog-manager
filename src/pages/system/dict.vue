<template>
  <div class="table-box">
    <el-button class="mr-10" type="primary" @click="openPopover()"><i-ep-plus style="font-size: 16px;" class="icon_button"></i-ep-plus>新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="字典名称" />
      <el-table-column prop="desc" label="字典描述" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <span v-if="scope.row.status">{{ scope.row.status ? '启用' : '停用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
        <template #default="scope">
          <span v-if="scope.row.create_time">{{ formatDate(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更改时间" width="180" >
        <template #default="scope">
          <span v-if="scope.row.update_time">{{ formatDate(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button class="mr-10" type="warning" @click="openDialog(scope.row)">
            <i-ep-edit class="icon_button"></i-ep-edit>
            编辑
          </el-button>
          <el-button class="mr-10" type="danger" @click="handleDelete(scope.row)">
            <i-ep-delete class="icon_button"></i-ep-delete>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑和新增弹窗 -->
    <el-dialog v-model="visible" :title="isAdd ? '添加' : '编辑'">
      <el-form label-width="80px" :model="formData" >
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="字典描述" prop="desc">
          <el-input v-model="formData.desc" />
        </el-form-item>
        <el-form-item label="字典状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button @click="visible = false"> 取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-pagination background layout="prev, pager, next" :total="pageData.total" v-model:page-size="pageData.pageSize"
      v-model:current-page="pageData.pageNo" @update:current-page="handleGetData"
      @update:page-size="handleGetData" />
  </div>
</template>

<script lang='ts' setup>
import { getDictTypeList, updateDictType, deleteDictType } from "@/api/dict";
import { formatDate } from '@/utils/date'
import usePopover from '@/hook/common/usePopover'
import useTableData from "@/hook/common/useTableData";
import { ref, onMounted } from "vue";

const dictList: any = ref([])
const formData = ref({})
const { visible, isAdd, openPopover } = usePopover()
const { tableData, pageData, handleGetData, initPageParams } = useTableData({
  fetchApi: getDictTypeList
})

const openDialog = (data: any) => {
  formData.value = data
  openPopover(false)
}

const onSubmit = async () => {
  await updateDictType({...formData.value, update_time: +new Date()})
  initPageParams()
  visible.value = false
}

const handleDelete = async (data: any) => {
    ElMessageBox.confirm(
      `确认删除 ${data.role_name} 这个用户吗?`,
      '提示',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        await deleteDictType(data.role_id)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        initPageParams()
      })

  }

</script>

<style scoped lang='scss'>
  .table-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .el-pagination {
    margin-top: 20px;
  }
</style>