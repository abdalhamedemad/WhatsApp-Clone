<script setup>
const userImage = ref("");
const enteredMessage = ref("");
const messageData2 = ref([
  {
    message: "wmptylnknijnoijoij",
    isMe: false,
    time: "2:22 pm",
    groupMessage: false,
    senderName: "New Name",
  },
]);
function sendMessage() {
  console.log(enteredMessage.value);
  messageData2.value.push({
    message: enteredMessage.value,
    isMe: true,
    time: "2:22 pm",
    groupMessage: false,
    senderName: "New Name",
  });
  enteredMessage.value = "";
}
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
          <h3 class="inline-block text-[17px] font-semibold">New Name</h3>
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
    <section class="ch overflow-auto mb-[62px]">
      <!-- <HomePageMessageBoxText :isMe="false" , /> -->
      <!-- <HomePageMessageBoxText :isMe="true" /> -->
      <HomePageMessageBoxText
        v-for="(message, index) in messageData2"
        :key="index"
        :messageData="{
          message: message.message,
          isMe: message.isMe,
          time: message.time,
          groupMessage: message.groupMessage,
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
