<template>
  <div class="nav-container">
    <div class="nav-top">
      <el-button class="mr-10" type="primary" @click="openPopover">新增</el-button>
      <el-input class="mr-10" v-model="selectInput" style="width: 200px;" placeholder="导航链接模糊搜索"></el-input>
      <el-button type="primary" @click="">搜索</el-button>
    </div>
    <el-table :data="linkList" style="width: 100%">
      <el-table-column prop="link_name" label="导航名称" width="180"></el-table-column>
      <el-table-column prop="link_desc" label="导航描述" width="180" ></el-table-column>
      <el-table-column prop="jump_id" label="导航分类">
        <template #default="scope">
          <el-tag>{{ jumpList.find(item => item.jump_id === scope.row.jump_id)?.jump_tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="link_priority" label="权重" width="100" ></el-table-column>
      <el-table-column prop="link_icon" label="导航logo" width="200">
        <template #default="scope">
          <div v-if="scope.row.article_cover" style="width: 120px;height: 120px;border-radius: 6px;">
            <img :src="scope.row.article_cover" alt="" style="width: 100%;height: 100%;object-fit: contain;">
          </div>
          <span v-else>无logo</span>
        </template>
      </el-table-column>
      <el-table-column prop="link_url" label="导航链接" width="180" ></el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="fillForm(scope.row);openPopover(false)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteLinks(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" v-model:page-size="pageSize" v-model:current-page="pageNo"
    @update:current-page="getLinkList" @update:page-size="getLinkList"/>
    <el-dialog v-model="visible" :title="isAdd ? '新增导航链接' : '编辑导航链接'">
      <template #default>
        <el-form
        ref="navForm"
        :model="formData"
        :rules="formRule"
        label-width="120px"
        status-icon
      >
        <el-form-item label="导航名称" prop="link_name">
          <el-input v-model="formData.link_name" />
        </el-form-item>
        <el-form-item label="导航描述" prop="link_desc">
          <el-input v-model="formData.link_desc" />
        </el-form-item>
        <el-form-item label="导航跳转链接" prop="link_url">
          <el-input v-model="formData.link_url" />
        </el-form-item>
        <el-form-item label="权重" prop="link_priority">
          <el-input v-model="formData.link_priority" type="number" placeholder="权重越大排序越先"/>
        </el-form-item>
        <el-form-item label="导航链接类型" prop="jump_id">
          <el-select v-model="formData.jump_id" placeholder="导航链接类型" multiple>
            <el-option :label="item.jump_tag" :value="item.jump_id" v-for="item in jumpList" :key="item.jump_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(isAdd)">提交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import useDate from '@/hook/common/useDate'
import usePopover from '@/hook/common/usePopover'
import useNavLink from '@/hook/nav/useNavLink'
import useNavType from '@/hook/nav/useNavType'
import useLinkForm from '@/hook/form/useLinkForm'

const { formatDate } = useDate()
const { jumpList } = useNavType()
const { visible, isAdd, openPopover } = usePopover()
const { navForm, formData, formRule, submitForm, fillForm } = useLinkForm()
const { total, pageNo, pageSize, linkList, selectInput, getLinkList, deleteLinks } = useNavLink()
  
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