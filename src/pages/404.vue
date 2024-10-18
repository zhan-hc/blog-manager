<template>
  <div class="empty">
    <img class="empty-img" src="@/assets/image/404.png" alt="">
    <span>特朗普也找不到你的网站</span>
  </div>
</template>

<script lang='ts' setup>
</script>

<style scoped lang='scss'>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-img {
      width: 512px;
      height: 512px;
    }
    span {
      font-size: 22px;
    }
  }
</style>