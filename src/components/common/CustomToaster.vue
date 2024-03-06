<template>
  <teleport to="body">
    <div class="toast">
      <transition-group name="toast">
        <toast-element
          v-for="item in toasterList"
          :item="item"
          :key="item.id"
        ></toast-element>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { toasterList } from "@/composables/toaster";
import ToastElement from "@/components/common/ToastElement.vue";
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  position: fixed;
  right: 20px;
  top: 20px;
  z-index: 9000;
  flex-direction: column;

  gap: 12px;
  pointer-events: none;

  max-width: 326px;
  width: 100%;

  background: transparent;

  transition: all 0.5s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.toast-enter-active {
  transition: all 0.5s cubic-bezier(0.27, 1.85, 0.99, 0.65);
}
.toast-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.toast-leave-active {
  transition: all 0.5s ease;
}
</style>
