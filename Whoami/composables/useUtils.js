import { useWindowSize } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { io } from "socket.io-client";
import { useJwt } from "@vueuse/integrations/useJwt";
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
    const now = new Date();
    const { header, payload } = useJwt(token);
    console.log("header", header, payload);
    if (!token || payload.exp < now.getTime() / 1000) {
      localStorage.removeItem("token");
      return false;
    } else {
      return true;
    }
  };

  const socketComposable = async () => {
    const socket = await io("http://localhost:8080", {
      transports: ["websocket"],
    });
    console.log("socket1");
    return socket;
  };

  return { getScreens, VerifyToken, socketComposable };
};
