<template>
  <div>
    <div class="tag-top">
      <el-button class="mr-10" type="primary" @click="tapOpenPopup(); openPopover()"> <i-ep-plus style="font-size: 16px;"
          class="icon_button"></i-ep-plus>创建</el-button>
      <el-input v-model="page.tag_name" style="width: 200px;" class="mr-10" placeholder="文章标题模糊搜索">
        <template #suffix>
          <i-ep-search style="font-size: 12px;"></i-ep-search>
        </template>
      </el-input>
      <el-button type="primary" @click="tapSearch">搜索</el-button>
      <el-button @click="tapSearchReset">重置</el-button>
    </div>
    <div class="content">
      <el-table :data="tagList" :row-key="(row: any) => row.tag_id" style="width: 100%">
        <el-table-column prop="tag_name" label="名称" />
        <el-table-column prop="tag_desc" label="描述" />
        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="update_time" label="更改时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button class="mr-10" type="warning" @click="tapOpenPopup(scope.row.tag_id); openPopover(false)">
              <i-ep-edit class="icon_button"></i-ep-edit>
              编辑
            </el-button>
            <el-button class="mr-10" type="danger" @click="tapDelete(scope.row.tag_id)">
              <i-ep-delete class="icon_button"></i-ep-delete>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑和新增弹窗 -->
      <el-dialog v-model="visible" :title="isAdd ? '添加' : '编辑'" @close="offPopup">
        <el-form ref="tagFormRef" label-width="80px" :model="popupFormData" :rules="rules">
          <el-form-item label="名称" prop="tag_name">
            <el-input v-model="popupFormData.tag_name" />
          </el-form-item>
          <el-form-item label="描述" prop="tag_desc">
            <el-input v-model="popupFormData.tag_desc" />
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
      <el-pagination background layout="prev, pager, next" :total=total v-model:page-size="page.pageSize"
        v-model:current-page="page.pageNo" @update:current-page="getTagListFun" @update:page-size="getTagListFun" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import useTag from '@/hook/article/useTag'
import usePopover from '@/hook/common/usePopover'
import useTagForm from '@/hook/form/useTagForm'

const { tagList, total, page, getTagListFun, tapDelete, tapSearch, tapSearchReset } = useTag('page')
const { popupFormData, rules, tagFormRef, tapOpenPopup, offPopup, submitForm } = useTagForm()
const { visible, isAdd, openPopover } = usePopover()

const onSubmit = async (isAdd: boolean) => {
  await submitForm(isAdd)
  visible.value = false
  getTagListFun()
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