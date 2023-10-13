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
        <div class="card-item">
          <div class="hd">
            <span>uv-访客数量</span>
          </div>
          <div class="md count">{{uvData}}</div>
        </div>
      </div>
      <div class="filter">
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
      </div>
      
      <div class="statistics">
        <pie :data="navPieData" title="快捷导航埋点数据"></pie>
        <pie :data="pvData" title="pv-各页面的浏览数据"></pie>
      </div>
      
    </div>
  </div>
</template>

<script lang='ts' setup>
  import pie from './components/pie.vue'
  import useTag from '@/hook/article/useTag'
  import useCategory from '@/hook/article/useCategory'
  import useArticle from '@/hook/article/useArticle'
  import { getLinkData, getPvAndUv } from '@/api/bury'
  import { onMounted, reactive, toRefs } from 'vue'
  import dayjs from 'dayjs'

  const { total: tagTotal } = useTag()
  const { total: categoryTotal } = useCategory()
  const { total: articleTotal } = useArticle()

  const state = reactive({
    startEndTime: [],
    navPieData: [],
    pvData: [],
    uvData: 0
  })
  const { navPieData, pvData, uvData, startEndTime } = toRefs(state)

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
    const [_err, navdata ] = await getLinkData(params)
    state.navPieData = navdata.map((item: any) => {
    return {
      value: item.count,
      name: item.event_name.split('-')[1]
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
      .filter {
        display: flex;
        align-items: center;
        .item {
          display: flex;
          align-items: center;
        }
      }
      .statistics {
        display: flex;
        margin-top: 20px;
      }
    }
  }
</style>