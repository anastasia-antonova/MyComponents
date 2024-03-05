import { ref } from "vue";
import { ToasterInterface } from "@/types/ToasterInterface";

export const toasterList = ref([] as ToasterInterface[]);

export const addToast = (item: ToasterInterface) => {
  const element = Object.assign({}, item);

  if (element.lifeTime) {
    element.lifeTime = element.lifeTime * 1000;
  } else {
    element.lifeTime = 5000;
  }
  element.id = Date.now().toString(36) + Math.random().toString(36).substr(2);

  toasterList.value.unshift(element);
};

export const removeToast = (id: string) => {
  const objWithIdIndex = toasterList.value.findIndex((obj) => obj.id === id);
  if (objWithIdIndex > -1) {
    toasterList.value.splice(objWithIdIndex, 1);
  }
};
