<template>
  <div ref="chartEl" :style="{ width: '400px', height: '400px' }"></div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, Ref, ref, toRefs, watch } from 'vue'
import useECharts from '@/hook/common/useECharts'
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
  title: {
    text: props.title || '标题',
    x: 'center',y: 'top',
  },
  tooltip: {
    trigger: 'item', // 当鼠标悬浮在某个数据项上时触发
    formatter: function(params: any) {
      return `${params.data.name}--${params.data.value}`
    }
  },
  series: [
    {
      type: "pie",
      data: [],
      selectedMode: 'single',
      radius: ['50%', '70%'],
      clockwise: false,
      label: {
        normal: {
          position: 'outside', // 设置标签向外
          formatter: '{b}\n{c}次 ({d}%)' // 设置标签格式
        }
      },
    }
  ]
})

const chartEl = ref<HTMLDivElement | null>(null)

const {
    setOption,
    showLoading
} = useECharts(chartEl as Ref<HTMLDivElement>, true, true, RenderType.SVGRenderer, ThemeType.Default)

watch(() => props.data, (val) => {
  showLoading()
  option.series[0].data = val
  setOption(option)
})
</script>

<style scoped lang='scss'>
  
</style>