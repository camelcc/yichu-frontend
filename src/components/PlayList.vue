<template>
    <div>
        <p v-if="video.type != 'video'">目前不支持视频列表解析</p>
        <div v-if="video.type == 'video'">
            <p>{{ video.description }}</p>
            <video controls v-bind:poster="video.thumbnail" v-bind:src="video.url" width="720px"></video>
            <a :href="'yichu://video;data?' + urlScheme() ">Open App</a>
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
    urlScheme () {
      return Object.keys(this.video).map(k =>
        encodeURIComponent(k) + '=' + btoa(unescape(encodeURIComponent(this.video[k])))
      ).join('&')
    }
  }
}
</script>

<style scoped>
</style>
