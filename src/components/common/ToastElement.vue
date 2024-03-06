<template>
  <div
    class="toast-element"
    :class="item.status"
    @click="deleteItem"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="content">
      <p>{{ item.message }}</p>
      <button class="btn__default btn__icon">
        <i class="icon icon-close"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { removeToast } from "@/composables/toaster";
import { onMounted, ref, defineProps } from "vue";
import { ToasterInterface } from "@/types/ToasterInterface";

const props = defineProps({
  item: {
    type: Object as () => ToasterInterface,
    required: true,
  },
});

const counter = ref(100);
const isHovered = ref(false);
let intervalId = 0 as ReturnType<typeof setInterval>;

const createTimer = () => {
  intervalId = setTimeout(() => {
    deleteItem();
  }, 5000);
};

const deleteItem = () => {
  clearInterval(intervalId);
  removeToast(props.item.id!);
};

onMounted(() => {
  if (props.item.lifeTime) {
    createTimer();
  }
});
</script>

<style scoped lang="scss">
.toast-element {
  overflow: hidden;
  pointer-events: auto;
  display: flex;
  flex-direction: column;

  min-width: 100%;

  border-radius: 12px;

  border: 1px solid black;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex: 1 1 100%;
    padding: 16px;
    height: 100%;

    .icon-close {
      mask-image: url("@/assets/image/close.svg");
    }

    p {
      display: flex;

      font-family: Inter;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;

      word-break: break-word;
      white-space: pre-wrap;

      &::before {
        content: "";
        display: block;
        margin: auto 18px auto 0;
        transition: 0.3s ease;
        align-items: center;
        min-width: 20px;
        height: 20px;

        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    .btn__default {
      padding: 0;
      margin: 0;
      width: fit-content;
    }
  }
  &.warning {
    background: #feefe7;
    border-color: #f98347;

    .content {
      p {
        color: #60b286;

        &::before {
          background-image: url("@/assets/image/success.svg");
        }
      }

      .icon-close {
        background-color: #60b286;
      }
    }
  }
  &.success {
    background: #e8f3ed;
    border-color: #60b286;

    .content {
      p {
        color: #60b286;

        &::before {
          background-image: url("@/assets/image/success.svg");
        }
      }

      .icon-close {
        background-color: #60b286;
      }
    }
  }
  &.error {
    background: #fdeceb;
    border-color: #ed2424;

    .content {
      p {
        color: #ed2424;

        &::before {
          background-image: url("@/assets/image/error.svg");
        }
      }

      .icon-close {
        background-color: #ed2424;
      }
    }
  }
  &.info {
    background: #eaefff;
    border-color: #4187ff;

    .content {
      p {
        color: #4187ff;

        &::before {
          background-image: url("@/assets/image/info.svg");
        }
      }
    }
  }
}
</style>
