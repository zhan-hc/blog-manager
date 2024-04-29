<template>
  <div>
    <div class="tag-top">
      <el-button class="mr-10" type="primary" @click="openPopover()"> <i-ep-plus style="font-size: 16px;"
          class="icon_button"></i-ep-plus>创建</el-button>
      <el-input v-model="searchData.project_name" style="width: 200px;" class="mr-10" placeholder="文章项目模糊搜索">
        <template #suffix>
          <i-ep-search style="font-size: 12px;"></i-ep-search>
        </template>
      </el-input>
      <el-button type="primary" @click="tapSearch">搜索</el-button>
      <el-button @click="tapSearchReset">重置</el-button>
    </div>
    <div class="content">
      <el-table :data="projectData.projectList" style="width: 100%">
        <el-table-column prop="project_name" label="项目名称" />
        <el-table-column prop="project_imgurl" label="项目预览图">
          <template #default="scope">
            <div style="width: 120px;height: 140px;border-radius: 6px;">
              <img :src="scope.row.project_imgurl" alt="" style="width: 100%;height: 100%;object-fit: contain;">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="project_url" label="项目链接" />
        <el-table-column prop="create_time" label="创建时间" width="180">
          <template #default="scope">
            <span>{{ formatDate(scope.row.create_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更改时间" width="180" >
          <template #default="scope">
            <span>{{ formatDate(scope.row.update_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button class="mr-10" type="warning" @click="setFormData(scope.row); openPopover(false)">
              <i-ep-edit class="icon_button"></i-ep-edit>
              编辑
            </el-button>
            <el-button class="mr-10" type="danger" @click="tapDelete(scope.row.category_id)">
              <i-ep-delete class="icon_button"></i-ep-delete>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑和新增弹窗 -->
      <el-dialog v-model="visible" :title="isAdd ? '添加' : '编辑'" @close="closePop">
        <el-form ref="projectFormRef" label-width="120px" :model="formData" :rules="rules">
          <el-form-item label="项目名称" prop="project_name">
            <el-input v-model="formData.project_name" />
          </el-form-item>
          <el-form-item label="项目跳转链接" prop="project_url">
            <el-input v-model="formData.project_url" />
          </el-form-item>
          <el-form-item label="项目描述" prop="project_desc">
            <el-input v-model="formData.project_desc" />
          </el-form-item>
          <el-form-item label="项目展示图" prop="project_desc">
            <el-input v-model="formData.project_imgurl" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="onSubmit(isAdd)">确定</el-button>
            <el-button @click="visible = false"> 取消</el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 分页 -->
    </div>
    <!-- 
      background--是否添加背景颜色
      layou--定义分页组件的布局'prev-上一页, pager-页码, next-下一页, jumper-跳转输入框
      total--总共多少数据
      page-size--每页显示条目数
      current-page--当前页数
    -->
    <div class="pagination_box">
      <el-pagination background layout="prev, pager, next" :total="projectData.total" v-model:page-size="searchData.pageSize"
        v-model:current-page="searchData.pageNo" @update:current-page="getProjectData"
        @update:page-size="getProjectData" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue'
import { formatDate } from '@/utils/date'
import useProject from '@/hook/project/useProject'
import usePopover from '@/hook/common/usePopover'
import useProjectForm from '@/hook/form/useProjectForm'

const { searchData, projectData, getProjectData } = useProject()
const { formData, rules, projectFormRef, setFormData, closePop, submitForm } = useProjectForm()
const { visible, isAdd, openPopover } = usePopover()

onMounted(async () => {
  await getProjectData()
})

// 点击弹窗确定
const onSubmit = async (isAdd: boolean) => {
  await submitForm(isAdd)
  visible.value = false
  await getProjectData()
}

</script>



<style scoped lang='scss'>
// 按钮中加图标 不协调用这个
.tag-top {
  margin-bottom: 20px;

  .mr-10 {
    margin-right: 10px;
  }
}

.pagination_box {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>