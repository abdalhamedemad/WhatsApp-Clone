<script setup>
import { ref } from "vue";
const userImage = ref("");
const items = [
  [
    {
      label: "New group",
    },
  ],
  [
    {
      label: "New Community",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Starred messages",
    },
  ],
  [
    {
      label: "Select chats",
    },
    {
      label: "Settings",
    },
  ],
  [
    {
      label: "Log out",
    },
  ],
];
</script>

<template>
  <div>
    <header class="flex items-center justify-between p-[16px] bg-[#f0f2f5]">
      <div class="user-image w-[40px]">
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
      <div class="icons text-[#54656f]">
        <span><font-awesome-icon :icon="['fas', 'user-group']" /></span>
        <span><font-awesome-icon :icon="['fas', 'circle-notch']" /></span>
        <span><font-awesome-icon :icon="['fas', 'message']" /></span>
        <span>
          <!-- <i> -->
          <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </UDropdown>
          <!-- </i> -->
        </span>
      </div>
    </header>
  </div>
</template>

<style scoped>
.border-50per {
  border-radius: 50%;
}
.icons span {
  font-size: 18px;
}
.icons span {
  cursor: pointer;
  padding: 8px;
}
.icons span:not(:last-child) {
  margin-right: 8px;
}
</style>
