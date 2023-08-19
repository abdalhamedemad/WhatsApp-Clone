<script setup>
const props = defineProps({
  userData: {
    userImage: {
      type: String,
      default: "http://localhost:3000/defaultUserImage.png",
    },
    unReadMessageNum: {
      type: Number,
      default: 0,
    },
    userName: {
      type: String,
      default: "",
    },
    lastMessage: {
      type: String,
      default: "",
    },
    lastMessageTime: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
});
const items = [
  [
    {
      label: "Archive chat",
    },
  ],
  [
    {
      label: "Mute notifications",
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Delete chat",
    },
  ],
  [
    {
      label: "Pin chat",
    },
    {
      label: "Mark as unread",
    },
  ],
];
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
            props.userData.userImage
              ? props.userData.userImage
              : 'http://localhost:3000/defaultUserImage.png'
          "
          alt=""
        />
      </div>
      <div class="content flex flex-col flex-grow">
        <div class="user-group-name flex items-center">
          <h3 class="inline-block text-[17px] font-semibold">
            {{
              props.userData.userName
                ? props.userData.userName
                : props.userData.phoneNumber
            }}
          </h3>
          <span class="flex-grow"></span>
          <p class="inline-block text-[12px]">
            {{ props.userData.lastMessageTime }}
          </p>
        </div>
        <div class="user-group-description flex justify-between items-center">
          <p class="inline-block text-[14px] overflow-hidden">
            <!-- the last message the last messagethe last messagethe last messagethe -->
            {{ props.userData.lastMessage }}
          </p>
          <span class="flex items-center">
            <span class="text-[20px] text-[#54656f]">
              <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <font-awesome-icon
                  class="rotate-90"
                  :icon="['fas', 'angle-right']"
                />
                <!-- <font-awesome-icon :icon="['fas', 'bars']" /> -->
              </UDropdown>
            </span>
            <span
              class="w-[20px] h-[20px] border-50per bg-[#00a884] flex items-center justify-center text-[#fff] ml-[16px]"
            >
              {{ props.userData.unReadMessageNum }}
            </span>
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
