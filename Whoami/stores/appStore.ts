import { defineStore } from "pinia";
import { useFetch } from "@vueuse/core";
import { useJwt } from "@vueuse/integrations/useJwt";

export const useCounterStore = defineStore("counter", () => {
  const userData = ref([]);
  const activeChat = ref({
    userName: "John Doe",
    lastMessage:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    lastMessageTime: "12:00",
    unReadMessageNum: 2,
    phoneNumber: "+91 1234567890",
    messages: [],
  });
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
  function VerifyToken() {
    const token = localStorage.getItem("token");
    const now = new Date();
    const { header, payload } = useJwt(token);
    console.log("header", header, payload);
    if (!token || payload.exp < now.getTime() / 1000) {
      localStorage.removeItem("token");
      return false;
    } else {
      return true;
    }
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
  async function sendMessage(message: any, toId: string, messageType: string) {
    let body: any = "";
    if (messageType == "record") {
      const formData = new FormData();
      //add the Blob to formData
      formData.append("record", message, "recording.mp3");
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("token", localStorage.getItem("token"));
      formData.append("toId", toId);
      formData.append("messageType", "record");
      body = formData;
      const { isFetching, data, error } = await useFetch(
        "http://localhost:8080/feed/send-message",
        {
          method: "POST",
          body,
        }
      ).json();
      console.log(data);
      if (data.value.status === 201) {
        return data;
      } else {
        return data;
      }
    } else {
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
            messageType: "text",
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
    VerifyToken,
  };
});
