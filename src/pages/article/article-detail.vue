<template>
  <div class="editor-container">
    <div class="editor-top">
      <input class="editor-input"  v-model="formData.article_title" placeholder="输入文章标题..." placeholder-class="" />
      <el-button type="primary"  @click="openPopover(Boolean(id))">发布</el-button>
    </div>
    <v-md-editor v-model="formData.article_content"></v-md-editor>
    <el-drawer v-model="visible" direction="rtl" :title="isAdd ? '新增文章' : '编辑文章'">
      <template #default>
        <el-form
        ref="articleForm"
        :model="formData"
        :rules="formRule"
        label-width="120px"
        status-icon
      >
        <el-form-item label="文章名称" prop="article_title">
          <el-input v-model="formData.article_title" />
        </el-form-item>
        <el-form-item label="文章封面" prop="article_cover">
          <el-upload
            class="image-uploader"
            :action="`${envApiHost}/upload/file`"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
          >
            <img v-if="formData.article_cover" :src="formData.article_cover" class="article-image" />
            <el-icon v-else class="image-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章描述" prop="article_desc">
          <el-input v-model="formData.article_desc" />
        </el-form-item>
        <el-form-item label="文章分类" prop="category_id">
          <el-select v-model="formData.category_id" placeholder="文章分类">
            <el-option :label="item.category_name" :value="item.category_id" v-for="item in categoryList" :key="item.category_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag_ids">
          <el-select v-model="tag_ids" placeholder="文章标签" multiple>
            <el-option :label="item.tag_name" :value="item.tag_id" v-for="item in tagList" :key="item.tag_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">发布</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang='ts' setup>
import useTag from '@/hook/article/useTag'
import usePopover from '@/hook/common/usePopover'
import useCategory from '@/hook/article/useCategory'
import useArticleDetail from '@/hook/article/useArticleDetail'
import { envApiHost } from '@/utils/env'
import { Plus } from '@element-plus/icons-vue'

const { tagList } = useTag()
const { categoryList } = useCategory()
const { visible, isAdd, openPopover } = usePopover()
const { id, articleForm, formData, tag_ids, formRule, submitForm, resetAllStatus, beforeUpload, uploadSuccess } = useArticleDetail()
</script>

<style scoped lang='scss'>
.editor-container {
  .editor-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .editor-input {
      font-size: 28px;
      border: none;
    }
  }
  .v-md-editor {
    height: calc(100vh - 64px);
  }
  .image-uploader {
    :deep(.el-upload) {
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: .2s;
      &:hover {
        border-color: #409eff;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
      .image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
      }
    }
  }
}
  
</style>