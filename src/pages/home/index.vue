<template>
  <div class="home-container">
    <div class="home-header"></div>
    <div class="home-content">
      <div class="card-wrap">
        <div class="card-item">
          <div class="hd">
            <img src="@/assets/image/icon-article.png" alt="">
            <span>文章</span>
          </div>
          <div class="md count">{{articleTotal}}</div>
        </div>
        <div class="card-item">
          <div class="hd">
            <img src="@/assets/image/icon-category.png" alt="">
            <span>分类</span>
          </div>
          <div class="md count">{{categoryTotal}}</div>
        </div>
        <div class="card-item">
          <div class="hd">
            <img src="@/assets/image/icon-tag.png" alt="">
            <span>标签</span>
          </div>
          <div class="md count">{{tagTotal}}</div>
        </div>
      </div>
      <nav-pie></nav-pie>
    </div>
  </div>
</template>

<script lang='ts' setup>
import navPie from './components/navPie.vue'
import useTag from '@/hook/article/useTag'
import useCategory from '@/hook/article/useCategory'
import useArticle from '@/hook/article/useArticle'
const { total: tagTotal } = useTag()
const { total: categoryTotal } = useCategory()
const { total: articleTotal } = useArticle()
</script>

<style scoped lang='scss'>
  .home-container {
    .home-header{}
    .home-content {
      .card-wrap {
        display: flex;
        margin-bottom: 40px;
        .card-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 200px;
          padding: 10px 0;
          box-sizing: border-box;
          box-shadow: 0 4px 8px 6px rgba(7,17,27,0.06);
          border-radius: 6px;
          margin-right: 40px;
          &:last-child {
            margin-right: 0;
          }
          .hd {
            display: flex;
            align-items: center;
            img {
              width: 28px;
              height: 28px;
            }
            span {
              margin-left: 10px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 2px;
            }
          }
          .md {
            margin-top: 10px;
          }
          .count {
            font-size: 28px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>