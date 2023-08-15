<script setup>
const props = defineProps({
  messageData: {
    message: String,
    time: String,
    isMe: Boolean,
    groupMessage: Boolean,
    senderName: String,
  },
});

// const message = {
//   isMe: false,
// };
</script>
<template>
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
      <p class="flex flex-wrap text-[14px]">
        {{ props.messageData.message }}
      </p>
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
</style>
