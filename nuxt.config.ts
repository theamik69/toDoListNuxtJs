// https://nuxt.com/docs/api/configuration/nuxt-config
import VueMeta from 'vue-meta'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.css'
  ],
  buildModules: [
    VueMeta
  ],
  meta: {
    script: [
      { src: 'bootstrap/dist/js/bootstrap.js', body: true }
    ]
  },
})

