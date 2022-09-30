<template>
  <q-page class="constrain-camera-frame q-pa-md">
    <div class="camera-frame q-pa-md">
      <video class="full-width" autoplay playsinline ref="video" v-show="!imageCaptured"/>
      <canvas ref="canvas" class="full-width" height="240" v-show="imageCaptured"/>
    </div>
    <div class="text-center">
      <q-btn round color="grey-10" icon="camera" @click="captureImg"/>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input v-model="post.caption" class="col col-sm-8" label="Caption" dense/>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input v-model="post.location" class="col col-sm-8" label="Location" dense>
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" />
        </template>
      </q-input>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn unelevated rounded color="grey-10">Post Image</q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { uid } from 'quasar'
require('md-gum-polyfill')

export default defineComponent({
  name: 'CameraPage',
  data(){
    return{
      post:{
        id: uid(),
        caption: '',
        location: '',
        image: null,
        date: Date.now()
      },
      imageCaptured: false
    }
  },
  methods:{
    initCamera(){
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      })
    },
    captureImg(){
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      let context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
    }
  },
  mounted(){
    this.initCamera()
  }
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
