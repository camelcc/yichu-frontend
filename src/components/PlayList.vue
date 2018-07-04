<template>
    <div>
        <p v-if="video.type != 'video'">目前不支持视频列表解析</p>
        <div v-if="video.type == 'video'">
            <p>{{ video.description }}</p>
            <video controls v-bind:poster="video.thumbnail" v-bind:src="video.url" width="720px"></video>
            <a :href="'yichu://video/' + urlScheme() ">Open App</a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PlayList',
  props: {
    video: Object
  },
  methods: {
      urlScheme() {
          return btoa(unescape(encodeURIComponent(JSON.stringify(this.video))));
      }
  }
}
</script>

<style scoped>
</style>
