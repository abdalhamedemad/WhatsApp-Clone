// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@nuxthq/ui"],
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
});
