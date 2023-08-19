import { useWindowSize } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { io } from "socket.io-client";
export const useUtils = () => {
  const getScreens = () => {
    const width = useWindowSize().width;
    watchEffect(() => {
      if (width.value < 600) screen.value = "sm";
      else if (width.value < 728) screen.value = "md";
      else if (width.value < 980) screen.value = "lg";
      else if (width.value < 1280) screen.value = "xl";
      else screen.value = "2xl";
      return screen;
    });
    return screen;
  };
  const VerifyToken = () => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (token && tokenExpiry) {
      // const now = new Date();
      if (now.getTime() > tokenExpiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        return false;
      }
    }
    return token;
  };

  const socketComposable = async () => {
    const socket = await io("http://localhost:8080", {
      transports: ["websocket"],
    });
    return socket;
  };

  return { getScreens, VerifyToken, socketComposable };
};
