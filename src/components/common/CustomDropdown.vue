<template lang="pug">
.custom-select(:tabindex="tabindex", @blur="open = false")
  .custom-dropdown(:class="{ open: open }", @click="open = !open")
    .image-lead {{ initialLetter(selectedUser) }}
    p {{ selectedUser ? selectedUser.attributes.name : "no data" }}
    .icon.icon-arrow
  ul(:class="{ selectHide: !open }")
    li(
      v-for="(item, index) of leadData",
      :key="index",
      @click="selectOption(item.id)"
    )
      .image-lead {{ initialLetter(item) }}
      p {{ item.attributes.name }} {{ item.attributes.surname }}
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { getLeadList } from "@/services/LeadApi";
import { LeadsTypes } from "@/types/LeadsTypes";

const props = defineProps({
  default: {
    type: String,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
  },
});
const emit = defineEmits(["input"]);

const open = ref(false);
const leadData = ref<LeadsTypes[]>([]);
const selected = ref(-1);

const selectedUser = computed(() => {
  if (selected.value !== -1) {
    const findIndex = leadData.value.findIndex((value) => {
      return value.id === selected.value;
    });
    if (findIndex !== -1) {
      return leadData.value[findIndex];
    }
  }
  return null;
});

const selectOption = (option: number) => {
  selected.value = option;
  emit("input", leadData.value);
  open.value = false;
};

onMounted(() => {
  emit("input", selected.value);
  getLeadList().then(({ data }) => {
    leadData.value = data.data;
  });
});

function initialLetter(item: LeadsTypes) {
  if (item && item.attributes.name && item.attributes.surname) {
    return item.attributes.name[0] + item.attributes.surname[0];
  } else {
    return " ";
  }
}
</script>

<style scoped lang="scss">
.selectHide {
  display: none;
}
.custom-select {
  position: relative;
  outline: none;
  max-height: 50px;

  .custom-dropdown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--text);
    overflow: hidden;
    border: 1px solid var(--primary);
    border-radius: 4px;
    padding: 14px 16px;
    box-sizing: border-box;
    max-height: 50px;

    background-color: var(--white);

    .image-lead {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: var(--perfume);
      color: var(--white);
      font-size: 10px;
    }

    .icon {
      width: 12px;
      height: 12px;
      &.icon-arrow {
        mask-image: url("@/assets/image/icon/arrow-dawn.svg");
        background-color: black;
        mask-size: cover;
      }
    }

    p {
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      margin-left: 12px;
      flex: 1 1 auto;
    }

    &.open {
      border-radius: 4px 4px 0px 0px;
      border-bottom: none;
      .icon-arrow {
        transform: rotateZ(180deg);
      }
    }
  }

  ul {
    color: var(--text);
    cursor: pointer;
    background-color: var(--white);
    border: 1px solid var(--primary);
    border-radius: 0 0 4px 4px;
    position: absolute;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      border-bottom: 1px solid #ecebeb;
      padding: 16px 14px;
      box-sizing: border-box;

      .image-lead {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: var(--perfume);
        color: var(--white);
        font-size: 10px;
      }

      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        border-top: none;
      }

      &:hover {
        background-color: var(--primary-hover);
        color: var(--white);
      }
    }
  }

  .selected {
    background-color: #0a0a0a;
    border-radius: 6px;
    border: 1px solid #666666;
    color: #fff;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;

    &:after {
      position: absolute;
      content: "";
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #fff transparent transparent transparent;
    }
  }
}
</style>
