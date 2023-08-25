<template>
  <div class="article-container">
    <div class="article-top">
      <el-button class="mr-10" type="primary" @click="routerGo('/articleDetail')">新增</el-button>
      <el-input class="mr-10" v-model="selectInput" style="width: 200px;" placeholder="文章标题模糊搜索"></el-input>
      <el-select class="mr-10" v-model="categoryId" placeholder="文章分类" @change="getAllArticle">
        <el-option :label="item.category_name" :value="item.category_id" v-for="item in categoryList" :key="item.category_id"></el-option>
      </el-select>
      <el-select class="mr-10" v-model="tagId" placeholder="文章标签" @change="getAllArticle">
        <el-option :label="item.tag_name" :value="item.tag_id" v-for="item in tagList" :key="item.tag_id"></el-option>
      </el-select>
      <el-select class="mr-10" v-model="status" placeholder="文章状态" @change="getAllArticle">
        <el-option label="启用" :value="1" ></el-option>
        <el-option label="下架" :value="0" ></el-option>
      </el-select>
      <el-button @click="initData">重置</el-button>
      <el-button type="primary" @click="getAllArticle">搜索</el-button>
    </div>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column fixed prop="article_title" label="文章标题" width="200"/>
      <el-table-column prop="article_desc" label="文章描述" width="200"/>
      <el-table-column prop="category_id" label="文章分类">
        <template #default="scope">
          <el-tag>{{ categoryList.find(item => item.category_id === scope.row.category_id)?.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="article_tag" label="文章标签" width="160">
        <template #default="scope">
          <div v-if="scope.row.tag_id_blog_tags">
            <el-tag style="margin-right: 10px;" type="success" v-for="item in scope.row.tag_id_blog_tags" :key="item">{{ tagList.find(tag => tag.tag_id === item.tag_id)?.tag_name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="article_cover" label="文章图片" width="200">
        <template #default="scope">
          <div v-if="scope.row.article_cover" style="width: 120px;height: 120px;border-radius: 6px;">
            <img :src="scope.row.article_cover" alt="" style="width: 100%;height: 100%;object-fit: contain;">
          </div>
          <span v-else>无封面图</span>
        </template>
      </el-table-column>
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
      <el-table-column prop="status" label="状态" width="120" >
        <template #default="scope">
          <el-button @click="updateStatus(scope.row)" :type="scope.row.status ? 'danger' : 'primary'" size="small">{{scope.row.status ? '下架' : '启用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="routerGo(`/articleDetail/${scope.row.article_id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="delArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" v-model:page-size="pageSize" v-model:current-page="pageNo"
    @update:current-page="getAllArticle" @update:page-size="getAllArticle"/>
  </div>
</template>

<script lang='ts' setup>
import useArticle from '@/hook/article/useArticle'
import useTag from '@/hook/article/useTag'
import useCategory from '@/hook/article/useCategory'
import useRouter from '@/hook/common/useRouter'
import { formatDate } from '@/utils/date'

const { routerGo } = useRouter()
const { tagList } = useTag()
const { categoryList } = useCategory()
const { total, tagId, categoryId, status, pageNo, pageSize, articleList,  selectInput, initData, delArticle, getAllArticle, updateStatus } = useArticle()

</script>

<style scoped lang='scss'>
  .article-container {
    .article-top {
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