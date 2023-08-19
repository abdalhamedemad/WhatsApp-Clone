<script setup>
import { useCounterStore } from "~/stores/appStore.ts";
// const fetchData = useCounterStore();
// const { data } = fetchData.fetchUsersData;
const store = useCounterStore();
console.log(store.userData);
console.log("users", await store.fetchUsersData());
</script>

<template>
  <div>
    <main class="flex h-[100vh]">
      <aside class="w-[480px] shadow-sm">
        <HomePageTheHeader />
        <HomePageSearchBar class="box-container" />
        <div class="clc-height relative overflow-x-auto">
          <HomePageChatBox
            v-for="(item, index) in store.userData"
            :key="index"
            :userData="item"
            @click="store.setActiveChat(item)"
          />
        </div>
      </aside>
      <section class="fl flex-grow">
        <HomePageChatRoom :activeChat="store.activeChat" />
      </section>
    </main>
  </div>
</template>
<style scoped>
.clc-height {
  height: calc(100vh - 133px);
}
</style>
