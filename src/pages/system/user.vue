<template>
  <div class="table-box">
    <el-table :data="tableData" :row-key="row => row.user_id" style="width: 100%">
      <el-table-column prop="user_id" label="用户id" />
      <el-table-column prop="user_name" label="用户名称" />
      <el-table-column prop="signature" label="个性签名" />
      <el-table-column prop="avatar_url" label="头像链接">
        <template #default="scope">
          <img v-if="scope.row.avatar_url" :src="scope.row.avatar_url" alt="" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="role_name" label="角色">
        <template #default="scope">
          <span>{{ scope.row.role.role_name }}</span>
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
    <el-dialog v-model="visible" title="编辑">
      <el-form label-width="80px" :model="formData" >
        <el-form-item label="用户名称" prop="user_name">
          <el-input v-model="formData.user_name" />
        </el-form-item>
        <el-form-item label="个性签名" prop="signature">
          <el-input v-model="formData.signature" />
        </el-form-item>
        <el-form-item label="头像链接" prop="avatar_url">
          <el-input v-model="formData.avatar_url" />
        </el-form-item>
        <el-form-item label="用户角色" prop="role_id">
          <el-select
            v-model="formData.role_id"
            placeholder="请选择用户角色"
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in roleList"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            />
          </el-select>
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
import { deleteUser, getUserList, updateUser } from "@/api/user";
import { getRoleList } from "@/api/role";
import { formatDate } from '@/utils/date'
import usePopover from '@/hook/common/usePopover'
import useTableData from "@/hook/common/useTableData";
import { ref, onMounted } from "vue";

const roleList: any = ref([])
const formData = ref({})
const { visible, isAdd, openPopover } = usePopover()
const { tableData, pageData, handleGetData, initPageParams } = useTableData({
  fetchApi: getUserList
})

const openDialog = (data: any) => {
  const newData = { ...data }
  delete newData.role
  formData.value = newData
  openPopover(false)
}

const onSubmit = async () => {
  await updateUser({...formData.value, update_time: +new Date()})
  initPageParams()
  visible.value = false
}

const handleDelete = async (data: any) => {
    ElMessageBox.confirm(
      `确认删除 ${data.user_name} 这个用户吗?`,
      '提示',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(async () => {
        await deleteUser(data.user_id)
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        initPageParams()
      })

  }

onMounted(async () => {
  const[err, data]:any = await getRoleList()
  if (!err) {
    roleList.value = data.rows
  }
})

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