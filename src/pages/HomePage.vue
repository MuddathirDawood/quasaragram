<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
          <q-card class="card-post q-mb-md" flat bordered v-for="post in posts" :key="post">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://i.postimg.cc/4djWHWZj/triforce-gmail.jpg">
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
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">No posts yet..</h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
        <q-item-section avatar>
          <q-avatar size="50px">
            <img src="https://i.postimg.cc/4djWHWZj/triforce-gmail.jpg">
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
      posts:[],
      loadingPosts: false
    }
  },
  methods:{
    niceDate(value){
      return date.formatDate(value, 'MMMM D h:mmA')
    },
    getPosts(){
      this.loadingPosts = true
      fetch('https://quasaragram-api.herokuapp.com/posts')
      .then(res => res.json())
      .then(data => {
        this.posts = data.posts
        this.loadingPosts = false
      })
      .catch(() => {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not download posts'
        })
        this.loadingPosts = false
      })
    }
  },
  created(){
    this.getPosts()
  }
})
</script>
