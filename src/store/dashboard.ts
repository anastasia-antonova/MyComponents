import { ref } from "vue";
import { defineStore } from "pinia";
import { UserInterface } from "@/types/UserInterface";

const defaultUser = {
  id: 0,
  username: "",
  email: "",
};

export const dashboardStore = defineStore(
  "dashboard",
  () => {
    const isAuthorized = ref(false);
    const user = ref({ ...defaultUser } as UserInterface);

    const accessToken = ref("");

    const setAuthorized = () => {
      isAuthorized.value = true;
    };
    const saveUser = (data: UserInterface) => {
      user.value = data;
    };

    const setTokens = (payload: { accessToken: string }) => {
      accessToken.value = payload.accessToken;
    };

    const clear = () => {
      isAuthorized.value = false;
      user.value = { ...defaultUser };
      accessToken.value = "";
    };

    return {
      isAuthorized,
      user,
      accessToken,
      setTokens,
      saveUser,
      setAuthorized,
      clear,
    };
  },
  {
    persist: true,
  }
);
