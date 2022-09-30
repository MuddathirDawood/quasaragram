<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" bordered>
      <q-toolbar class="text-grey-10 constrain">
        <q-btn class="large-screen-only q-mr-sm" flat round color="text-grey-10" icon="home" size="18px" dense to="/"/>
        <q-separator vertical spaced class="large-screen-only"/>
        <q-toolbar-title class="text-grand-hotel text-bold">
          Quasaragram
        </q-toolbar-title>
        <q-btn class="large-screen-only" flat round color="text-grey-10" icon="camera" size="18px" dense to="/camera"/>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer class="bg-white small-screen-only" bordered>
          <q-tabs v-model="tab" class="text-grey-10" active-color="blue-9" indicator-color="transparent">
            <q-route-tab to="/" exact icon="home"/>
            <q-route-tab to="/camera" exact icon="camera"/>
          </q-tabs>
      </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data(){
    return{
      tab: 'home'
    }
  }
})
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px
.q-toolbar
  .q-btn
    @media (min-width: $breakpoint-sm-min)
      display: flex
      align-items: center
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
.q-footer
  .q-tab__icon
    font-size: 30px
</style>
