<template>
  <q-page class="constrain q-pa-md">
    <div class="row">
      <div class="col-sm-8 col-xs-12">
        <q-card class="card-post q-mb-md" flat bordered>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Muddathir Dawood</q-item-label>
          <q-item-label caption>
            Cape Town, South Africa
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-img src="https://cdn.quasar.dev/img/parallax1.jpg"/>
      <q-card-section>
        <div>The Wonders of Venice</div>
        <div class="text-caption text-grey">July 05 18:35PM</div>
      </q-card-section>
    </q-card>
      </div>
      <div class="col-4 large-screen-only">
        Mini Profile
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>
