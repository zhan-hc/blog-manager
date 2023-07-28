<template>
  <div>
    <div class="article-top">
      <el-input v-model="selectInput" style="width: 200px; margin-right: 10px;" size="large" placeholder="文章标题模糊搜索"></el-input>
      <el-button type="primary" @click="routerGo('/articleDetail')">新增</el-button>
    </div>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column fixed prop="article_title" label="文章标题"/>
      <el-table-column prop="article_desc" label="文章描述" width="200"/>
      <el-table-column prop="category_id" label="文章分类">
        <template #default="scope">
          <el-tag>{{ categoryList.find(item => item.category_id === scope.row.category_id)?.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="article_tag" label="文章标签" width="160">
        <template #default="scope">
          <el-tag type="success" v-for="item in scope.row.article_tag.split(',').map(Number)" :key="item">{{ tagList.find(tag => tag.tag_id === item)?.tag_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="article_cover" label="文章图片" width="120" />
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
      <el-table-column prop="article_status" label="状态" width="120" >
        <template #default="scope">
          <el-button :type="scope.row.article_status ? 'danger' : 'primary'" size="small">{{scope.row.article_status ? '下架' : '启用'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="routerGo(`/articleDetail/${scope.row.article_id}`)">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts' setup>
import useArticle from '@/hook/article/useArticle'
import useTag from '@/hook/article/useTag'
import useCategory from '@/hook/article/useCategory'
import useDate from '@/hook/common/useDate'
import useRouter from '@/hook/common/useRouter'

const { tagList } = useTag()
const { categoryList } = useCategory()
const { articleList,  selectInput } = useArticle()
const { formatDate } = useDate()
const { routerGo } = useRouter()

</script>

<style scoped lang='scss'>
  
</style>@/hook/common/useRouterFun