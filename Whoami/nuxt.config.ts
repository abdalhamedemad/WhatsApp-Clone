// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@nuxthq/ui", "@pinia/nuxt", "nuxt-socket-io"],
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ["~/assets/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],
  // io: {
  //   sockets: [
  //     // Required
  //     {
  //       // At least one entry is required
  //       name: "home",
  //       url: "http://localhost:8080",
  //       default: false,
  //       vuex: {
  //         /* see section below */
  //       },
  //       namespaces: {
  //         /* see section below */
  //       },
  //     },
  //     // { name: 'work', url: 'http://somedomain1:3000' },
  //     // { name: 'car', url: 'http://somedomain2:3000' },
  //     // { name: 'tv', url: 'http://somedomain3:3000' },
  //     // { name: 'test', url: 'http://localhost:4000' }
  //   ],
  // },
});
