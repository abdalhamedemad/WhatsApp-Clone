import { defineStore } from "pinia";
import { useFetch } from "@vueuse/core";
export const useCounterStore = defineStore("counter", () => {
  const userData = ref([
    // {
    //   userName: "John Doe",
    //   lastMessage:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //   lastMessageTime: "12:00",
    //   unReadMessageNum: 2,
    //   phoneNumber: "+91 1234567890",
    // },
    // {
    //   userName: "Mark joe",
    //   lastMessage:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    //   lastMessageTime: "12:22",
    //   unReadMessageNum: 10,
    //   phoneNumber: "+91 1234567890",
    // },
  ]);
  const activeChat = ref({
    userName: "John Doe",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    lastMessageTime: "12:00",
    unReadMessageNum: 2,
    phoneNumber: "+91 1234567890",
    messages: [],
  });
  // const name = ref("Eduardo");
  // const doubleCount = computed(() => count.value * 2);

  // function increment() {
  //   // count.value++;
  // }
  function setActiveChat(chat: any) {
    console.log(activeChat.value);
    console.log(chat);
    activeChat.value = chat;
    console.log("active chat", activeChat.value.userId);
    fetchMessages(activeChat.value.userId);
  }

  /////////////////// fetch  ///////////////////////
  async function fetchUsersData() {
    console.log("fetching data");
    const { isFetching, data, error } = await useFetch(
      "http://localhost:8080/feed/users"
    ).json();

    console.log(isFetching, "isffff");
    if (data.value) console.log("ddd", data.value.userData);
    if (!isFetching.value && !error.value && data.value) {
      console.log("add");
      for (let i = 0; i < data.value.userData.length; i++) {
        userData.value.push({
          userName: data.value.userData[i].name,
          lastMessage: "this is a test message",
          lastMessageTime: "12:00",
          unReadMessageNum: 2,
          phoneNumber: "+91 1234567890",
          userId: data.value.userData[i]._id,
        });
      }
    }
    console.log(userData);
    return { isFetching, data, error };
  }
  async function Login(email: string, password: string) {
    console.log("fetching login data");
    const { isFetching, data, error } = await useFetch(
      "http://localhost:8080/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    ).json();
    console.log(data);
    console.log(data);
    const token = data.value.token;
    const userId = data.value.userId;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    return { isFetching, data, error };
  }
  async function Signup(email: string, password: string, name: string) {
    console.log("fetching signup data");
    const { isFetching, data, error } = await useFetch(
      "http://localhost:8080/auth/signup",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      }
    ).json();
    console.log(data);
    if (data.value.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  async function sendMessage(message: string, toId: string) {
    const { isFetching, data, error } = await useFetch(
      "http://localhost:8080/feed/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          userId: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          toId,
        }),
      }
    ).json();
    console.log(data);
    if (data.value.status === 201) {
      return true;
    } else {
      return false;
    }
  }
  async function fetchMessages(toId: string) {
    const { isFetching, data, error } = await useFetch(
      "http://localhost:8080/feed/conversation-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
          toId,
        }),
      }
    ).json();
    console.log(data);
    activeChat.value.messages = data.value.conversationData;
    if (data.value.status === 200) {
      return data.value.messages;
    } else {
      return false;
    }
  }
  return {
    userData,
    activeChat,
    setActiveChat,
    fetchUsersData,
    Login,
    Signup,
    sendMessage,
  };
});
