<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
      <q-card class="card-post q-mb-md" flat bordered v-for="post in posts" :key="post">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">m_Dawood</q-item-label>
          <q-item-label caption>
            {{post.location}}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img :src="post.imageUrl"/>
      <q-card-section>
        <div>{{post.caption}}</div>
        <div class="text-caption text-grey">{{niceDate(post.date)}}</div>
      </q-card-section>
    </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
        <q-item-section avatar>
          <q-avatar size="50px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">m_Dawood</q-item-label>
          <q-item-label caption>
            Muddathir Dawood
          </q-item-label>
        </q-item-section>
      </q-item>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'HomePage',
  data(){
    return{
      posts:[
        {
          id: 1,
          caption: 'The Wonders of Venice',
          date: 1664519464749,
          location: 'Cape Town, South Africa',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg '
        },
        {
          id: 2,
          caption: 'The Wonders of Venice',
          date: 1664519464749,
          location: 'Cape Town, South Africa',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg '
        },
        {
          id: 3,
          caption: 'The Wonders of Venice',
          date: 1664519464749,
          location: 'Cape Town, South Africa',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg '
        },
        {
          id: 4,
          caption: 'The Wonders of Venice',
          date: 1664519464749,
          location: 'Cape Town, South Africa',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg '
        },
        {
          id: 5,
          caption: 'The Wonders of Venice',
          date: 1664519464749,
          location: 'Cape Town, South Africa',
          imageUrl: 'https://cdn.quasar.dev/img/parallax1.jpg '
        },
      ]
    }
  },
  methods:{
    niceDate(value){
      return date.formatDate(value, 'MMMM D h:mmA')
    }
  }
})
</script>
