<template>
    <div class="center-align">
      <p class="orange-text text-darken-4" v-if="video.type != 'video'">不支持解析播放列表</p>
      <a id="install_app_btn" class="btn-large waves-effect waves-light" href="https://itunes.apple.com" v-if="timedout">下载 App</a>
      <div v-if="video.type == 'video'">
        <video class="responsive-video" controls>
          <source v-bind:poster="video.thumbnail" v-bind:src="video.url" type="video/mp4"/>
        </video>
      </div>
      <div id="open_app" class="fixed-action-button" v-if="isiOS">
        <a id="open_app_btn" class="btn waves-effect waves-light" v-on:click="openApp">App 中打开</a>
      </div>
    </div>
</template>

<script>
import Common from '@/components/common.js'

export default {
  name: 'PlayList',
  props: {
    video: Object,
    isiOS: false,
    timedout: false
  },
  methods: {
    urlScheme () {
      return Object.keys(this.video).map(k =>
        encodeURIComponent(k) + '=' + btoa(unescape(encodeURIComponent(this.video[k])))
      ).join('&')
    },
    openApp () {
      location.href = 'yichu://video;data?' + this.urlScheme()
      setTimeout(() => {
        this.timedout = true
      }, 3000)
    }
  },
  mounted () {
    this.isiOS = Common.isiOS()
  }
}
</script>

<style lang="scss" scoped>
#open_app {
  position: fixed;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  #open_app_btn {
    border-radius: 27px;
  }
}
</style>
