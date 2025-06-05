<template>
  <div ref="chartEl" :style="{ width: '800px', height: '800px' }"></div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, Ref, ref, toRefs, watch } from 'vue'
import useMapECharts from '@/hook/common/useMapECharts'
import chinaJson from '@/assets/json/china.json' // 引入中国地图
import { echartDataType, RenderType, ThemeType } from "@/constants/types"

const props = defineProps({
  data: {
    type: Array<echartDataType>,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const option: any = reactive({
  title:{
    text:'中国访客记录',
    x:'center',
    textStyle: {
      color:'#9c0505'
    }
  },
  // 数据和类型
  series: [{
    type:'map',
    map:'china',
    label:{
      show: true,
      color:'red',
      fontSize:10
    },
    // 地图大小倍数
    zoom:1.2,
    data:[]
  }],
  visualMap:{
    min: 0,
    max: 5000,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['lightskyblue', 'yellow', 'orangered']
    }
  }
})

const chartEl = ref<HTMLDivElement | null>(null)

const {
    setOption,
    showLoading
} = useMapECharts(chartEl as Ref<HTMLDivElement>, true, true, RenderType.SVGRenderer, ThemeType.Default)

watch(() => props.data, (val) => {
  showLoading()
  option.series[0].data = val
  setOption(option)
})

onMounted(() => {
  setOption(option)
})
</script>

<style scoped lang='scss'>
  
</style>