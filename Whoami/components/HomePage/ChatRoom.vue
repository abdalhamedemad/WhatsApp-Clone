<script setup>
import { onKeyStroke } from "@vueuse/core";
// import { Socket } from "net";
// import VEmojiPicker from 'v-emoji-picker';
// import packData from 'v-emoji-picker/data/emojis.json';

import { useCounterStore } from "~/stores/appStore.ts";
import { useUtils } from "~/composables/useUtils.js";
const store = useCounterStore();
const { socketComposable } = useUtils();
let typingShow = ref(false);
let socket = null;
onMounted(async () => {
  socket = await socketComposable();
  console.log(socketComposable());
  socket.on("connect", () => {
    console.log("socket connect", socket.id); // x8WIv7-mJelg7on_ALbx
  });
  socket.emit("add-user", localStorage.getItem("userId"));
  socket.on("messageChannel", (data) => {
    console.log(data);
    messageData2.value.push({
      body: data.message,
      me: false,
      time: "2:22 pm",
      groupMessage: false,
      senderName: "New Name",
    });
  });
  socket.on("typing", () => {
    typingShow.value = true;
    setTimeout(() => {
      typingShow.value = false;
    }, 1000);
  });
});

const userImage = ref("");
const enteredMessage = ref("");
// const messageData2 = ref([
//   {
//     message: "wmptylnknijnoijoij",
//     isMe: false,
//     time: "2:22 pm",
//     groupMessage: false,
//     senderName: "New Name",
//   },
// ]);
const messageData2 = ref(store.activeChat.messages);

//  watch changes in active chat
// watch(
//   () => store.activeChat,
//   (newValue, oldValue) => {
//     console.log(newValue);
//     messageData2.value = newValue.messages;
//   }
// );
watchEffect(() => {
  messageData2.value = store.activeChat.messages;
});
function sendMessage() {
  console.log(enteredMessage.value);

  console.log("messageData2", messageData2);
  messageData2.value.push({
    body: enteredMessage.value,
    me: true,
    time: "2:22 pm",
    groupMessage: false,
    senderName: "New Name",
  });
  enteredMessage.value = "";
}

onKeyStroke("Enter", (e) => {
  // e.preventDefault()
  const message = enteredMessage.value;
  sendMessage();
  // console.log(message);
  store.sendMessage(message, store.activeChat.userId);
  socket.emit("send-msg", {
    message: message,
    to: store.activeChat.userId,
  });
});
function typing() {
  console.log("typing", store.activeChat.userId);
  socket.emit("typing", {
    to: store.activeChat.userId,
  });
}
// Socket.emit("messageChannel", (data) => {
//   console.log(data);
//   messageData2.value.push({
//     message: data.message,
//     isMe: false,
//     time: "2:22 pm",
//     groupMessage: false,
//     senderName: "New Name",
//   });
// });
</script>
<template>
  <div class="relative h-full">
    <header
      class="h-[72px] w-full bg-[#f0f2f5] py-[10px] px-[16px] border-solid border-l-[1px] border-[#e9edef] flex items-center justify-between"
    >
      <div class="flex items-center">
        <div class="user-image w-[40px] mr-[15px]">
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
        <div class="user-group-name flex items-center">
          <h3 class="inline-block text-[17px] font-semibold">
            {{ store.activeChat.userName }} {{ typingShow ? "typing..." : "" }}
          </h3>
          <span class="flex-grow"></span>
          <!-- <p class="inline-block text-[12px]">2:22 pm</p> -->
        </div>
      </div>
      <div class="icons">
        <span>
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </span>
        <span><font-awesome-icon :icon="['fas', 'bars']" /></span>
      </div>
    </header>
    <section class="ch overflow-auto mb-[62px] pt-[20px]">
      <!-- <HomePageMessageBoxText :isMe="false" , /> -->
      <!-- <HomePageMessageBoxText :isMe="true" /> -->
      <HomePageMessageBoxText
        v-for="(message, index) in messageData2"
        :key="index"
        :messageData="{
          message: message.body,
          isMe: message.me,
          time: message.time ? message.time : '2:22 pm',
          groupMessage: message.groupMessage ? message.groupMessage : false,
        }"
      />
    </section>
    <footer
      class="absolute left-0 bottom-0 w-full h-[62px] bg-[#f0f2f5] px-[16px] py-[5px] flex items-center justify-between border-solid border-t-[1px] border-[#e9edef]"
    >
      <div class="icons">
        <span><font-awesome-icon :icon="['fas', 'face-smile']" /></span>
        <span><font-awesome-icon :icon="['fas', 'plus']" /></span>
      </div>
      <div class="input-text flex-grow mx-[8px]">
        <input
          name="search"
          placeholder="Type a message"
          class="search-box w-full h-[40px] px-[16px] bg-[#fff] rounded-md focus:outline-none"
          type="text"
          v-model="enteredMessage"
          @keyup="typing()"
        />
      </div>
      <div class="icons">
        <span v-if="enteredMessage != ''"
          ><font-awesome-icon
            @click="sendMessage"
            :icon="['fas', 'paper-plane']"
        /></span>
        <span v-else><font-awesome-icon :icon="['fas', 'microphone']" /></span>
      </div>
    </footer>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.border-50per {
  border-radius: 50%;
}
.icons span {
  font-size: 20px;
}
.icons span {
  cursor: pointer;
  padding: 8px;
  color: #54656f;
}
.icons span:not(:last-child) {
  margin-right: 8px;
}
.ch {
  height: calc(100vh - 134px);
}
</style>
