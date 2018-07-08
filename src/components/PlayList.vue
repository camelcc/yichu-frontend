<template>
    <div class="center-align">
      <p class="orange-text text-darken-4" v-if="video.type != 'video'">不支持解析播放列表</p>
      <div v-if="video.type == 'video'">
        <video class="responsive-video" controls>
          <source v-bind:poster="video.thumbnail" v-bind:src="video.url" type="video/mp4"/>
        </video>
        <p>
        <a :href="'yichu://video;data?' + urlScheme() ">Open App</a>
        </p>
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
