<script setup>
import { ref } from "vue";
const userImage = ref("");
const unReadMessageNum = ref(0);
</script>
<template>
  <div>
    <div
      class="box-container h-[72px] flex items-center hover:bg-[#f5f6f6] cursor-pointer border-solid border-b-[1px] border-[#e9edef]"
    >
      <div class="user-image w-[40px] mr-[16px]">
        <img
          class="w-[40px] h-[40px] border-50per"
          :src="
            userImage.length != 0
              ? userImage
              : 'http://localhost:3000/defaultUserImage.png'
          "
          alt=""
        />
      </div>
      <div class="content flex flex-col flex-grow">
        <div class="user-group-name flex items-center">
          <h3 class="inline-block text-[17px] font-semibold">New Name</h3>
          <span class="flex-grow"></span>
          <p class="inline-block text-[12px]">2:22 pm</p>
        </div>
        <div class="user-group-description flex justify-between items-center">
          <p class="inline-block text-[14px] overflow-hidden">
            the last message the last messagethe last messagethe last messagethe
          </p>
          <span class="flex items-center">
            <span class="rotate-90 text-[20px] text-[#54656f]">
              <font-awesome-icon :icon="['fas', 'angle-right']" />
            </span>
            <span
              class="w-[20px] h-[20px] border-50per bg-[#00a884] flex items-center justify-center text-[#fff] ml-[16px]"
              >9</span
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-50per {
  border-radius: 50%;
}
.user-group-description p {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 0px;
  @apply sm:max-w-[0px]  md:max-w-[250px];
}
</style>
