// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@nuxthq/ui", "@pinia/nuxt", "nuxt-socket-io"],
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
});
