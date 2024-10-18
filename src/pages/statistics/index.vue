<template>
  <div class="home-container">
    <div class="home-header"></div>
    <div class="home-content">
      <div class="card-wrap">
        <div class="card-item card">
          <div class="hd">
            <img src="@/assets/image/icon-article.png" alt="">
            <span>文章</span>
          </div>
          <div class="md count">{{articleTotal}}</div>
        </div>
        <div class="card-item card">
          <div class="hd">
            <img src="@/assets/image/icon-category.png" alt="">
            <span>分类</span>
          </div>
          <div class="md count">{{categoryTotal}}</div>
        </div>
        <div class="card-item card">
          <div class="hd">
            <img src="@/assets/image/icon-tag.png" alt="">
            <span>标签</span>
          </div>
          <div class="md count">{{tagTotal}}</div>
        </div>
        <div class="card-item card">
          <div class="hd">
            <span>uv-访客数量</span>
          </div>
          <div class="md count">{{uvData}}</div>
        </div>
      </div>
      <div class="rank-container">
        <div class="rank-box card">
          <div class="rank-title">快捷导航常用榜</div>
          <div class="rank-list">
            <div class="rank-item" v-for="(item, i) in rankNavData" :key="i">
              <span class="rank-num">{{ i + 1 }}.</span>
              <span class="rank-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="rank-box card">
          <div class="rank-title">博客文章欢迎榜</div>
          <div class="rank-list">
            <div class="rank-item" v-for="(item, i) in rankArticleData" :key="i">
              <span class="rank-num">{{ i + 1 }}.</span>
              <span class="rank-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="rank-box card">
          <div class="rank-title">博客标签访问榜</div>
          <div class="rank-list">
            <div class="rank-item" v-for="(item, i) in rankTagData" :key="i">
              <span class="rank-num">{{ i + 1 }}.</span>
              <span class="rank-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- <div class="filter">
        <div class="item">
          <div>起始时间：</div>
          <el-date-picker
            v-model="startEndTime"
            type="datetimerange"
            range-separator="-"
            start-placeholder="Start date"
            end-placeholder="End date"
            @change="timeChange"
          />
        </div>
        <el-button style="margin-left: 20px" @click="initParams">重置</el-button>
      </div> -->
      
      <div class="statistics">
        <pie :data="navPieData" title="快捷导航埋点数据"></pie>
        <pie :data="pvData" title="pv-各页面的浏览数据"></pie>
      </div>
      
    </div>
  </div>
</template>

<script lang='ts' setup>
  import dayjs from 'dayjs'
  import { onMounted, reactive, toRefs } from 'vue'
  import { getLinkData, getPvAndUv } from '@/api/bury'
  import useTag from '@/hook/article/useTag'
  import useCategory from '@/hook/article/useCategory'
  import useArticle from '@/hook/article/useArticle'
  import useStatistics from '@/hook/statistics/useStatistics'
  import pie from './components/pie.vue'

  const { total: tagTotal } = useTag()
  const { total: categoryTotal } = useCategory()
  const { total: articleTotal } = useArticle()

  const state = reactive({
    startEndTime: [],
    navPieData: [],
    pvData: [],
    uvData: 0,
    rankNavData: [],
    rankArticleData: [],
    rankTagData: []
  })
  const { navPieData, pvData, uvData, startEndTime, rankNavData, rankArticleData, rankTagData } = toRefs(state)
  const { getBuryCount } = useStatistics()

  const timeChange = (time:any) => {
    init()
  }

  const initParams = () => {
    state.startEndTime = []
    init()
  }
  const getNavData = async () => {
    const params: any = {eventName: '快捷导航-'}
    if (startEndTime.value.length > 1) {
      params.startTime = dayjs(startEndTime.value[0]).valueOf()
      params.endTime = dayjs(startEndTime.value[1]).valueOf()
    }
    const navdata = await getBuryCount(params)
    state.navPieData = navdata.map((item: any) => {
    return {
      value: item.count,
      name: item.event_name.split('-')[1]
      }
    })
  }

  const getRankNav = async () => {
    const data = await getBuryCount({
      eventName: '快捷导航-',
      startTime: 204012815000,
      limit: 5
    })
    state.rankNavData = data.map((item: { event_name: string, count: number }) => {
      return {
        name: item.event_name.replace('快捷导航-', ''),
        ...item
      }
    })
  }
  const getRankArticle = async () => {
    const data = await getBuryCount({
      eventName: '博客文章-',
      startTime: 204012815000,
      limit: 5
    })
    state.rankArticleData = data.map((item: { event_name: string, count: number }) => {
      return {
        name: item.event_name.replace('博客文章-', ''),
        ...item
      }
    })
  }

  const getRankTag = async () => {
    const data = await getBuryCount({
      eventName: '博客标签_',
      startTime: 204012815000,
      limit: 5
    })
    state.rankTagData = data.map((item: { event_name: string, count: number }) => {
      return {
        name: item.event_name.replace(/博客标签_(.*)页面/, '$1'),
        ...item
      }
    })
  }

  const getPvUvData = async () => {
    const params: any = {eventType: 'view'}
    if (startEndTime.value.length > 1) {
      params.startTime = dayjs(startEndTime.value[0]).valueOf()
      params.endTime = dayjs(startEndTime.value[1]).valueOf()
    }
    const [_err, data ] = await getPvAndUv({eventType: 'view'})
    state.pvData = data.pv.map((item: any) => {
    return {
      value: item.count,
      name: item.event_name
      }
    }),
    state.uvData = data.uv
  }

  const init = async () => {
    await getRankNav()
    await getRankArticle()
    await getRankTag()
    await getNavData()
    await getPvUvData()
  }
  onMounted(async () => {
    await init()
  })
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
      .rank-container {
        .rank-box {
          display: inline-flex;
          flex-direction: column;
          margin-right: 20px;
          padding: 20px;
          .rank-title {
            font-size: 20px;
            font-weight: bold;
            color: #f5fffa;
          }
          .rank-list {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            .rank-item {
              display: flex;
              margin-bottom: 5px;
              .rank-name {
                margin-left: 20px;
                font-size: 18px;
                font-weight: bold;
              }
              .rank-num {
                // flex: 1;
                font-weight: bold;
                color: #222226;
              }
            }
            
          }
          &:first-child {
            background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
          }
          &:nth-child(2) {
            background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
          }
          &:nth-child(3) {
            background-image: linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%);
          }
        }
      }
      
      .filter {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .item {
          display: flex;
          align-items: center;
        }
      }
      .statistics {
        display: inline-flex;
        margin-top: 40px;
      }
    }
  }
</style>