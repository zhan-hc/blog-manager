<template>
  <div>
    导航管理
  </div>
</template>

<script lang='ts' setup>
import { addArticle } from "@/api/atricle";
// import { getJumpTypes } from "@/api/jump";
import { onMounted } from 'vue'

  onMounted(async () => {
    const [err, data]:any = await addArticle({
      article_content: 'sadsadasd'
    })
    console.log(err, data, 'err data')
  })
  
</script>

<style scoped lang='scss'>
  
</style>