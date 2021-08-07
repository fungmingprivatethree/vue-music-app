<template>
  <div class="recommend">
    推薦頁面
  </div>
</template>

<script>
  import { getRecommend } from '@/service/recommend'
  export default {
    name: 'recommend',
    // run our js program in script , and we want to run it in created(開始生命週期時，就發送請求) period
    // 異步 run this program
    async created() {
      const result = await getRecommend()
      console.log(result)
    }
  }
</script>
<style lang="scss" scoped>

</style>
