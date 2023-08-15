<script setup>
const notFocused = ref(true);
</script>
<template>
  <div
    class="flex items-center w-full border-solid border-b-[1px] border-[#e9edef] pb-[10px]"
  >
    <div class="flex-grow py-[10px] h-[50px] relative">
      <input
        name="search"
        placeholder="Search or start new chat"
        class="search-box w-full h-[40px] px-[40px] bg-[#f0f2f5] rounded-md focus:outline-none"
        type="text"
        @focus="notFocused = false"
        @blur="notFocused = true"
      />
      <span
        class="search-icon absolute left-[10px] top-[calc(50%+5px)] translate-y-[-50%] font-[30px] text-[#54656f]"
        ><font-awesome-icon
          v-show="notFocused"
          :icon="['fas', 'magnifying-glass']"
        />
        <font-awesome-icon
          class="text-[#00a884]"
          v-show="!notFocused"
          :icon="['fas', 'arrow-right']"
        />
      </span>
    </div>
    <div class="text-[20px] text-[#54656f] pl-[16px]">
      <font-awesome-icon :icon="['fas', 'arrow-up-wide-short']" />
    </div>
  </div>
</template>
<style scoped>
.search-box:focus + span {
  transform: translateY(-50%) rotateZ(180deg);
  transition: all 0.3s ease-in-out;
}
</style>
