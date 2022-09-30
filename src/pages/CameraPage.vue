<template>
  <q-page class="constrain-camera-frame q-pa-md">
    <div class="camera-frame q-pa-md">
      <img src="https://cdn.quasar.dev/img/parallax1.jpg" class="full-width">
    </div>
    <div class="text-center">
      <q-btn round color="grey-10" icon="camera"/>
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
      }
    }
  }
})
</script>

<style lang="sass">
.camera-frame
  border: 2px solid $grey-10
  border-radius: 10px
</style>
