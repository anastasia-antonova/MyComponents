import { onMounted, onUnmounted, ref } from "vue";
export const isDesktop = ref(false);
export const isLaptop = ref(false);
export const isSmallLaptop = ref(false);
export const isTablet = ref(false);
export const isSmallTablet = ref(false);
export const isMobile = ref(false);
export const isSmallMobile = ref(false);

export function listener() {
  isDesktop.value = window.innerWidth <= 4096;
  isLaptop.value = window.innerWidth <= 1366;
  isSmallLaptop.value = window.innerWidth <= 1280;
  isTablet.value = window.innerWidth <= 1024;
  isSmallTablet.value = window.innerWidth <= 768;
  isMobile.value = window.innerWidth <= 640;
  isSmallMobile.value = window.innerWidth <= 375;
}
export function addListener() {
  onMounted(() => {
    listener();
    addEventListener("resize", listener);
  });
  onUnmounted(() => {
    removeEventListener("resize", listener);
  });
}
