import { defineStore } from "pinia";
import { ref } from "vue";
import { UserInterface } from "@/types/UserInterface";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref({});
    const accessToken = ref(localStorage.getItem("accessToken"));
    const refreshToken = ref(localStorage.getItem("refreshToken"));
    const rememberMe = ref(false);

    const isAuthorized = ref(false);

    const setAuthorized = () => {
      isAuthorized.value = true;
    };

    const saveUser = (payload: any) => {
      user.value = payload;
    };

    function setTokens(payload: {
      accessToken: string;
      refreshToken: string;
      rememberMe?: boolean;
    }): void {
      refreshToken.value = payload.refreshToken;
      accessToken.value = payload.accessToken;
      if (typeof payload.rememberMe === "boolean") {
        rememberMe.value = payload.rememberMe;
      }
      localStorage.setItem("accessToken", payload.accessToken);
      if (rememberMe.value || localStorage.getItem("refreshToken")) {
        localStorage.setItem("refreshToken", payload.refreshToken);
      }
    }

    function clear() {
      user.value = {};
      accessToken.value = "";
      refreshToken.value = "";
      rememberMe.value = false;
      isAuthorized.value = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    return {
      user,
      accessToken,
      isAuthorized,
      setAuthorized,
      refreshToken,
      rememberMe,
      setTokens,
      saveUser,
      clear,
    };
  },
  {
    persist: true,
  }
);
