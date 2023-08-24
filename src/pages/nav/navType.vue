<template>
  <div class="nav-container">
    <div class="nav-top">
      <el-button class="mr-10" type="primary" @click="openPopover();resetFormData()">新增</el-button>
      <el-input class="mr-10" v-model="selectInput" style="width: 200px;" placeholder="导航类型模糊搜索"></el-input>
      <el-button type="primary" @click="getJumpList">搜索</el-button>
    </div>
    <el-table :data="jumpList" style="width: 100%">
      <el-table-column prop="jump_tag" label="导航类型"></el-table-column>
      <el-table-column prop="jump_desc" label="导航类型描述"></el-table-column>
      <el-table-column prop="jump_priority" label="权重"></el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="fillForm(scope.row);openPopover(false)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteJumpType(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" v-model:page-size="pageSize" v-model:current-page="pageNo"
    @update:current-page="getJumpList" @update:page-size="getJumpList"/>
    <el-dialog v-model="visible" :title="isAdd ? '新增导航类型' : '编辑导航类型'">
      <template #default>
        <el-form
        ref="navForm"
        :model="formData"
        :rules="formRule"
        label-width="120px"
        status-icon
      >
        <el-form-item label="导航名称" prop="jump_tag">
          <el-input v-model="formData.jump_tag" />
        </el-form-item>
        <el-form-item label="导航描述" prop="jump_desc">
          <el-input v-model="formData.jump_desc" />
        </el-form-item>
        <el-form-item label="权重" prop="jump_priority">
          <el-input v-model="formData.jump_priority" type="number" placeholder="权重越大排序越先"/>
        </el-form-item>
      </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit(isAdd)">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import usePopover from '@/hook/common/usePopover'
import useNavType from '@/hook/nav/useNavType'
import useJumpForm from '@/hook/form/useJumpForm'

const { visible, isAdd, openPopover } = usePopover()
const { total, pageNo, pageSize, jumpList, selectInput, getJumpList, deleteJumpType } = useNavType()
const { navForm, formData, formRule, submitForm, fillForm, resetFormData } = useJumpForm()
const onSubmit = async (isAdd: boolean) => {
  await submitForm(isAdd)
  visible.value = false
  getJumpList()

}
  
</script>

<style scoped lang='scss'>
  .nav-container {
    .nav-top {
      margin-bottom: 20px;
      .mr-10 {
        margin-right: 10px;
      }
    }
    .el-pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
</style>