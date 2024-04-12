<template lang="pug">
.custom-select(:tabindex="tabindex", @blur="open = false")
  .custom-dropdown(:class="{ open: open }", @click="open = !open") {{ selectedUser }}
    .icon.icon-arrow
  ul(:class="{ selectHide: !open }")
    .member-button
      p Members
      .button-select
        p Select All
        p Clear
    li(
      v-for="(item, index) of memberData",
      :class="{ selected: isSelected(item.id) }",
      :key="index",
      @click="selectOption(item.id)"
    )
      .image-lead {{ initialLetter(item) }}
      p {{ item.attributes.name }} {{ item.attributes.surname }}
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { MembersTypes } from "@/types/MembersTypes";
import { getMemberList } from "@/services/memberApi";
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
const memberData = ref<MembersTypes[]>([]);
const selected = ref<number[]>([]);

const selectedUser = computed(() => {
  if (selected.value.length) {
    const mapName = selected.value.map((value) => {
      const findIndex = memberData.value.findIndex((v) => {
        return v.id === value;
      });
      if (findIndex !== -1) {
        return (
          memberData.value[findIndex].attributes.name +
          " " +
          memberData.value[findIndex].attributes.surname
        );
      }
      return "";
    });
    if (mapName.length > 2) {
      return mapName.slice(0, 2).join(", ") + `  +${mapName.length - 2} more`;
    } else {
      return mapName.join(", ");
    }
  }
  return "no data";
});
const selectOption = (option: number) => {
  if (isSelected(option)) {
    const findIndex = selected.value.findIndex((value) => {
      return value === option;
    });
    selected.value.splice(findIndex, 1);
  } else {
    selected.value.push(option);
  }

  emit("input", memberData.value);
};

// function selectAll() {}

function isSelected(value: number) {
  return selected.value.includes(value);
}

function initialLetter(item: MembersTypes) {
  if (item && item.attributes.name && item.attributes.surname) {
    return item.attributes.name[0] + item.attributes.surname[0];
  } else {
    return " ";
  }
}

onMounted(() => {
  emit("input", selected.value);
  getMemberList().then(({ data }) => {
    memberData.value = data.data;
  });
});
</script>

<style scoped lang="scss">
.selectHide {
  display: none;
}
.custom-select {
  position: relative;
  outline: none;

  .custom-dropdown {
    display: flex;
    justify-content: space-between;
    color: var(--text);
    overflow: hidden;
    border: 1px solid var(--primary);
    border-radius: 4px;
    padding: 16px 14px;
    box-sizing: border-box;

    background-color: var(--white);

    .icon {
      width: 12px;
      height: 12px;
      &.icon-arrow {
        mask-image: url("@/assets/image/icon/arrow-dawn.svg");
        background-color: black;
        mask-size: cover;
      }
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

    .member-button {
      display: flex;
      justify-content: space-between;
      padding: 16px 14px;
      border-bottom: 1px solid var(--primary);

      .button-select {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        text-decoration: underline;
        color: #035cea;
      }
    }

    li {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      border-bottom: 1px solid #ecebeb;
      padding: 16px 14px;
      box-sizing: border-box;

      &.selected {
        background-color: var(--background);
        color: var(--text-color);
        &:last-child {
          border-radius: 0 0 4px 4px;
        }
      }
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
}
</style>
