<script setup>
import { onKeyStroke } from "@vueuse/core";
import { useCounterStore } from "~/stores/appStore.ts";
import { useUtils } from "~/composables/useUtils.js";
import { useDevicesList, useUserMedia } from "@vueuse/core";
const store = useCounterStore();
const { socketComposable } = useUtils();
let typingShow = ref(false);
let socket = null;
// const audioElement = ref(null);
// let audio = null;
onMounted(async () => {
  // audio = audioElement.value;
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
  // watchEffect(() => {
  //   // preview on a video element
  //   audio.srcObject = stream.value;
  // });
});

/*//////////////////////////////// */
let blob = null;
const userImage = ref("");
const enteredMessage = ref("");
const messageData2 = ref(store.activeChat.messages);
watchEffect(() => {
  messageData2.value = store.activeChat.messages;
});
const sendRecord = ref(false);
async function sendMessage() {
  if (sendRecord.value) {
    sendRecord.value = false;
    audioRecording.value = false;
    // console.log("sendMessage blob", blob);
    // store.sendMessage(blob, store.activeChat.userId, "record");
    await saveRecording();
  } else {
    const message = enteredMessage.value;
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
    store.sendMessage(message, store.activeChat.userId, "text");
    socket.emit("send-msg", {
      message: message,
      to: store.activeChat.userId,
    });
  }
}

onKeyStroke("Enter", (e) => {
  // sendMessage();
});
function typing() {
  console.log("typing", store.activeChat.userId);
  socket.emit("typing", {
    to: store.activeChat.userId,
  });
}
//////////////////RECORDING aud////////////////////////
const audioRecording = ref(false);
const audioElement = ref(null);
let mediaStream = null;
let mediaRecorder = null;
// define a blob to hold the recording data

const startRecording = async () => {
  try {
    sendRecord.value = false;
    audioRecording.value = true;
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = async (e) => {
      blob = e.data;
      console.log("data available", e.data);
      const audioURL = URL.createObjectURL(e.data);

      console.log(audioURL);
      audioElement.value.src = audioURL;
      // await saveRecording();
    };
  } catch (error) {
    audioRecording.value = false;
    console.error("Error accessing camera:", error);
  }
};
async function saveRecording() {
  //the form data that will hold the Blob to upload
  // const formData = new FormData();
  // formData.append("record", blob, "recording.mp3");
  // console.log("fetching data");
  // const { isFetching, data, error } = await useFetch(
  //   "http://localhost:8080/feed/record",
  //   {
  //     method: "POST",
  //     body: formData,
  //   }
  // ).json();
  // console.log(isFetching, "isffff");
  let data = store.sendMessage(blob, store.activeChat.userId, "record");
  // const formData = new FormData();
  //add the Blob to formData
  socket.emit("send-msg", {
    message: data.path,
    type: "record",
    to: store.activeChat.userId,
  });
}

function stopRecording() {
  audioRecording.value = false;
  sendRecord.value = true;
  console.log("blob", blob);

  mediaStream.getTracks().forEach((track) => track.stop());
}
onBeforeUnmount(() => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }
});

//////////////////////////////////////////////////
</script>
<template>
  <!-- <audio src="" ref="audioElement"></audio> -->
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
      <div v-for="(message, index) in messageData2" :key="index">
        <HomePageMessageBoxVoice
          v-if="message.type == 'record'"
          :audioData="blob"
          :messageData="{
            isMe: true,
            time: '2:22 pm',
            src: message.body,
          }"
        />
        <HomePageMessageBoxText
          v-else
          :messageData="{
            message: message.body,
            isMe: message.me,
            time: message.time ? message.time : '2:22 pm',
            groupMessage: message.groupMessage ? message.groupMessage : false,
          }"
        />
      </div>
    </section>
    <footer
      class="absolute left-0 bottom-0 w-full h-[62px] bg-[#f0f2f5] px-[16px] py-[5px] flex items-center justify-between border-solid border-t-[1px] border-[#e9edef]"
    >
      <div class="icons">
        <span><font-awesome-icon :icon="['fas', 'face-smile']" /></span>
        <span><font-awesome-icon :icon="['fas', 'plus']" /></span>
      </div>
      <div class="input-text flex-grow mx-[8px]">
        <audio
          v-if="audioRecording || sendRecord"
          ref="audioElement"
          class="w-full"
          src=""
          controls
        ></audio>
        <input
          v-else
          name="search"
          placeholder="Type a message"
          class="search-box w-full h-[40px] px-[16px] bg-[#fff] rounded-md focus:outline-none"
          type="text"
          v-model="enteredMessage"
          @keyup="typing()"
        />
      </div>
      <div class="icons">
        <span
          @click="stopRecording"
          v-if="audioRecording && enteredMessage == ''"
          >ss</span
        >
        <span v-else-if="sendRecord || enteredMessage != ''"
          ><font-awesome-icon
            @click="sendMessage"
            :icon="['fas', 'paper-plane']"
        /></span>
        <span @click="startRecording" v-else
          ><font-awesome-icon :icon="['fas', 'microphone']"
        /></span>
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
