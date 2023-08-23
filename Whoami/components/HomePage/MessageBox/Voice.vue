<script setup>
import { ref } from "vue";

const props = defineProps({
  audioData: {
    type: Object,
    required: false,
  },
  messageData: {
    isMe: {
      type: Boolean,
      required: false,
      default: false,
    },
    time: {
      type: String,
      required: false,
      default: "2:22 pm",
    },
    src: {
      type: String,
      required: false,
      default: "",
    },
  },
});
// const videoElement = ref(null);
// const audioElement = ref(null);
// let mediaStream = null;
// let mediaRecorder = null;
// const startCamera = async () => {
//   try {
//     mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(mediaStream);
//     mediaRecorder.start();
//     mediaRecorder.ondataavailable = (e) => {
//       console.log(e.data);
//       const audioURL = URL.createObjectURL(e.data);
//       console.log(audioURL);
//       audioElement.value.src = audioURL;
//     };
//   } catch (error) {
//     console.error("Error accessing camera:", error);
//   }
// };
// function StopAudio() {
//   mediaStream.getTracks().forEach((track) => track.stop());
// }
// onBeforeUnmount(() => {
//   if (mediaStream) {
//     mediaStream.getTracks().forEach((track) => track.stop());
//   }
// });
</script>

<template>
  <!-- <div> -->
  <!-- <button @click="startCamera">Start Camera</button> -->
  <!-- <button @click="StopAudio">Stop Camera</button> -->
  <!-- <video ref="videoElement" autoplay></video> -->
  <!-- <audio src="" ref="audioElement" controls></audio> -->
  <!-- </div> -->
  <div
    :class="`px-[62px] w-full flex`"
    :style="`${
      props.messageData.isMe
        ? 'justify-content: flex-end;'
        : 'justify-content: flex-start;'
    }`"
  >
    <div
      :class="`${
        props.messageData.isMe ? 'me-send' : 'you-send'
      } flex relative pl-[6px] pt-[6px] pr-[6px] pb-[20px]`"
    >
      <audio
        class="bg-inherit text-inherit"
        :src="`${
          props.messageData.src.includes('http')
            ? props.messageData.src
            : 'http://localhost:8080/' + props.messageData.src
        }`"
        ref="audioElement"
        controls
        :class="`${props.messageData.isMe ? 'audio-me' : 'audio-you'}`"
      ></audio>
      <p class="absolute bottom-0 right-0 text-[11px] pr-[5px] pb-[3px]">
        {{ props.messageData.time }}
        <span><font-awesome-icon :icon="['fas', 'eye']" /></span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.me-send {
  background-color: #00a884;
  color: #fff;
  border-radius: 10px 10px 0 10px;
  /* padding: 8px 16px; */
  margin-bottom: 8px;
  max-width: 480px;
  min-width: 80px;
  word-wrap: break-word;
  /* justify-content: flex-end; */
}
.you-send {
  background-color: #f0f2f5;
  color: #000;
  border-radius: 10px 10px 10px 0;
  /* padding: 8px 16px; */
  margin-bottom: 8px;
  max-width: 480px;
  min-width: 80px;
  word-wrap: break-word;
  /* justify-content: flex-start; */
}
.audio-me::-webkit-media-controls-panel {
  background-color: #00a884;
}

.audio-you::-webkit-media-controls-panel {
  background-color: #f0f2f5;
}
</style>
