<template lang="pug">
teleport(to="body")
  transition(name="fade")
    .modal(v-if="isOpen")
      .modal--backdrop(@click="close")
      .modal--container
        .modal--wrapper
          .modal--close(@click="close")
            i.icon.icon-close
          slot(name="content")
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onBeforeUnmount } from "vue";
import useDisableScroll from "@/features/useDisableScroll";

const emit = defineEmits(["close", "submit"]);
const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

function close() {
  emit("close");
}

const keyPress = (event: KeyboardEvent) => {
  if (event && event.code === "Escape") {
    close();
  }
};
useDisableScroll();
document.addEventListener("keydown", keyPress);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyPress);
});
</script>

<style lang="scss" scoped>
@import "@/scss/_media";
@import "@/scss/styles";

.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  @include media_mobile {
    overflow: auto;
  }

  &--backdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #000000;
    top: 0;
    left: 0;
    opacity: 0.4;
  }

  &--container {
    max-height: 100%;
    overflow-y: auto;
    padding: 10px;
    z-index: 11;

    @include media_mobile {
      width: 100%;
      padding: unset;
      overflow-y: inherit;
    }
  }

  &--wrapper {
    width: 660px;
    position: relative;
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
    box-sizing: border-box;

    @include media_mobile {
      width: 100%;
      padding: 12px;
    }
  }

  &--close {
    display: flex;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 9;
    cursor: pointer;
    .icon {
      display: flex;

      &.icon-close {
        background-color: black;
        mask-image: url("@/assets/image/close.svg");
      }
    }
  }

  &--loader {
    top: calc(50% - 90px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
