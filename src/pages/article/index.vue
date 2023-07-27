<template>
  <div>
    <div class="article-top">
      <el-input v-model="selectInput" style="width: 200px; margin-right: 10px;" size="large" placeholder="文章标题模糊搜索"></el-input>
      <el-button type="primary" @click="isAdd = true;dialogVisible = true">新增</el-button>
    </div>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column fixed prop="article_title" label="文章标题"/>
      <el-table-column prop="article_desc" label="文章描述" width="200"/>
      <el-table-column prop="category_id" label="文章分类"/>
      <el-table-column prop="article_tag" label="文章标签">
        <template #default="scope">
          <div>
            <el-tag v-for="(item, i) in scope.row.article_tag.split(',')" :key="i">{{ item }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="article_cover" label="文章图片" width="120" />
      <el-table-column prop="create_time" label="创建时间" width="120">
        <template #default="scope">
          <span>{{ dayjs(scope.row.create_time).format('YYYY-MM-DD hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更改时间" width="120" >
        <template #default="scope">
          <span>{{ dayjs(scope.row.update_time).format('YYYY-MM-DD hh:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="article_status" label="状态" width="120" >
        <template #default="scope">
          <el-button :type="scope.row.article_status ? 'danger' : 'primary'" size="small">{{scope.row.article_status ? '下架' : '启用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default>
          <el-button type="primary" size="small" @click="isAdd = false;dialogVisible = true ">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="isAdd ? '新增文章' : '编辑文章'"
      width="30%"
    >
      <el-form
        ref="articleForm"
        :model="formData"
        :rules="formRule"
        label-width="120px"
        status-icon
      >
        <el-form-item label="文章名称" prop="atricle_title">
          <el-input v-model="formData.atricle_title" />
        </el-form-item>
        <el-form-item label="文章描述" prop="atricle_desc">
          <el-input v-model="formData.atricle_desc" />
        </el-form-item>
        <el-form-item label="文章分类" prop="category_id">
          <el-select v-model="formData.category_id" placeholder="">
            <!-- <el-option :label="item.tag_name" :value="item.tag_id" v-for="item in tagList" :key="item.tag_id"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="atricle_tag">
          <el-select v-model="formData.atricle_tag" placeholder="">
            <el-option :label="item.tag_name" :value="item.tag_id" v-for="item in tagList" :key="item.tag_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button>重置</el-button>
          <el-button type="primary" @click="submitForm(articleForm)">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import dayjs from 'dayjs'
import useArticle from '@/hook/article/useArticle'
import useDialog from '@/hook/common/useDialog';
const { articleForm, articleList, tagList, selectInput, isAdd, formData, formRule, submitForm } = useArticle()
const { dialogVisible } = useDialog()
console.log(dialogVisible, 'dialog')

</script>

<style scoped lang='scss'>
  
</style>