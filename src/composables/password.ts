import { ref } from "vue";

export enum Types {
  password = "password",
  text = "text",
}
export const passwordType = ref(Types.password);

export const showPassword = () => {
  if (passwordType.value === Types.password) {
    passwordType.value = Types.text;
  } else {
    passwordType.value = Types.password;
  }
};
