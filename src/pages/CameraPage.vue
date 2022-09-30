<template>
  <q-page class="constrain-camera-frame q-pa-md">
    <div class="camera-frame q-pa-md">
      <video class="full-width" autoplay playsinline ref="video" v-show="!imageCaptured"/>
      <canvas ref="canvas" class="full-width" height="240" v-show="imageCaptured"/>
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" icon="camera" @click="captureImg" v-if="enabledCamera"/>
      <q-file outlined v-model="imageUpload" v-else label="Choose An Image" accept="image/*" @input="capImgFallback">
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input v-model="post.caption" class="col col-sm-8" label="Caption" dense/>
    </div>
    <div class="row justify-center q-ma-md">
      <q-input v-model="post.location" class="col col-sm-8" label="Location" dense>
        <template v-slot:append>
          <q-btn round dense flat icon="eva-navigation-2-outline" @click="getLocation"/>
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
      imageCaptured: false,
      imageUpload: [],
      enabledCamera: true
    }
  },
  methods:{
    initCamera(){
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(err =>{
        this.enabledCamera = false
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
      this.post.image = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    },
    capImgFallback(file){
      this.post.image = file.target.files[0]
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      var reader = new FileReader()
      reader.onload = event => {
          var img = new Image()
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            context.drawImage(img,0,0)
            this.imageCaptured = true
          }
          img.src = event.target.result
      }
      reader.readAsDataURL(file.target.files[0])
    },
    disableCamera(){
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },

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
