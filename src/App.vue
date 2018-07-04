<template>
  <div id="app">
    <div>
      <p> 粘贴 Youtube 链接： </p>
      <p><input v-model="videoUrl"></p>
      <button v-on:click="parseUrl()">获取视频</button>
    </div>
    <PlayList v-if="parsed" v-bind:video="videoData"/>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import PlayList from './components/PlayList.vue'

export default {
  data() {
    return {
      videoUrl: "",

      videoData: {},

      parsed: false,
      error: "",
    }
  },
  methods: {
    parseUrl() {
      // clear status
      this.error = ""
      this.parsed = false


      var encodedUrl = encodeURI(this.videoUrl)
      axios.get('/parse', {
        params: {
          page: encodedUrl
        }
      })
      .then((response) => {
        // eslint-disable-next-line
        console.log(response.data)
        this.videoData = response.data
        this.parsed = true
      })
      .catch((error) => {
        this.error = error
      })
    }
  },
  components: {
    PlayList
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
