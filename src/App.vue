<template>
  <div id="app">
    <div class="row">
      <div id="youtube_link">
        <div id="url_input">
          <input placeholder="粘贴 Youtube 链接" type="url" v-model="videoUrl" class="validate">
        </div>
        <a id="url_parse" class="waves-effect waves-light btn-large grey darken-4" v-on:click="parseUrl()">提取</a>
      </div>
    </div>

    <div class="row">
      <div class="center-align" v-if="parsing">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>

      <PlayList v-if="parsed" v-bind:video="videoData"/>
      <p id="parse_error" class="grey-text text-lighten-1 center-align" v-if="error">出错了呢: <br/> {{ error }}</p>
    </div>
    <a ref="add_desk" onclick="M.toast({html: '点击 <span class=&quot;light-blue-text text-lighten-4&quot;>分享 -> 添加到桌面</span> 即可保存此 App'})" class="btn hide">Toast!</a>
  </div>
</template>

<script>
import axios from 'axios'
import PlayList from './components/PlayList.vue'
import Common from '@/components/common.js'

export default {
  data () {
    return {
      videoUrl: '',

      videoData: {},

      parsing: false,
      parsed: false,
      error: ''
    }
  },
  methods: {
    parseUrl () {
      // clear status
      this.error = ''
      this.parsed = false
      this.parsing = true

      var encodedUrl = encodeURI(this.videoUrl)
      axios.get('/parse', {
        params: {
          page: encodedUrl
        }
      }).then((response) => {
        // eslint-disable-next-line
        console.log(response.data)
        this.videoData = response.data
        this.parsed = true
        this.parsing = false
      }).catch((error) => {
        this.error = error
        this.parsing = false
      })
    }
  },
  components: {
    PlayList
  },
  mounted () {
    if (Common.isiOS()) {
      this.$refs.add_desk.click()
    }
  }
}

</script>

<style lang="scss">

@import 'src/assets/theme.scss';

#app {
  margin-bottom: 1rem;
}

#youtube_link {
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;

  #url_input {
    flex: 1;
    padding-right: 16px;
  }

  #url_parse {
    height: 3rem;
    line-height: 3rem;
  }
}
</style>
