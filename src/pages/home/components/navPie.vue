<template>
  <div ref="chartEl" :style="{ width: '400px', height: '400px' }"></div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, reactive, Ref, ref } from 'vue'
import useECharts from '@/hook/common/useECharts'
import { RenderType, ThemeType } from "@/constants/types"
import { getLinkData } from '@/api/bury'

const option: any = reactive({
  title: {
    text: '快捷导航埋点数据',
    x: 'center',y: 'top',
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
  onMounted(() => {
    nextTick(async() => {
    	// 显示loading
        showLoading()
        const [err, data ] = await getLinkData()
        option.series[0].data = data.map((item: any) => {
          return {
            ...item,
          value: item.count,
          name: item.event_name.split('-')[1]
          }
        })
        setOption(option);
    })
})
</script>

<style scoped lang='scss'>
  
</style>