// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules:[
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@sidebase/nuxt-auth'
  ],
  auth:{
    baseURL:`http://localhost:${process.env.PORT || 3000}`
  },

  runtimeConfig:{
    authSecret:'',
    githubId:'',
    githubSecret:'',
    googleId:'',
    googleSecret:'',
    authOrigin:'',
    // public:{

    // }
  }
})
