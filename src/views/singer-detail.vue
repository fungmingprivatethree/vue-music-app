<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
    >
    </music-list>
  </div>
</template>

<script>
  import { getSingerDetail } from '@/service/singer'
  import { processSongs } from '@/service/song'
  import MusicList from '@/components/music-list/music-list'

  export default {
    name: 'singer-detail',
    components: { MusicList },
    props: {
      singer: Object
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      pic() {
        return this.singer && this.singer.pic
      },
      title() {
        return this.singer && this.singer.name
      }
    },
    // send the request URL to QQ server to get the data
    async created() {
      const result = await getSingerDetail(this.singer)
      this.songs = await processSongs(result.songs)
    }
  }
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>
