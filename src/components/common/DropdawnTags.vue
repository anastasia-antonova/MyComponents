<template lang="pug">
button.btn__default.add-tags(@click="open = !open")
  .icon.icon-plus
  p Add
.custom-select(:class="{ selectHide: !open }")
  ul
    li
      .search
        .icon.icon-search
    li(
      v-for="(item, index) of tagsDataFilter",
      :key="index",
      @click="selectOption(item)"
    )
      p {{ item.attributes.name }}
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";
import { getTagsList } from "@/services/tagsApi";
import { TagsTypes } from "@/types/TagsTypes";

const props = defineProps({
  selected: {
    type: Array as () => TagsTypes[],
    default: () => [],
  },
});
const emit = defineEmits(["addTag"]);

const open = ref(false);
const tagsData = ref<TagsTypes[]>([]);

const selectOption = (option: TagsTypes) => {
  emit("addTag", option);
};

function isSelected(id: number) {
  const index = props.selected.findIndex((value) => {
    return value.id === id;
  });
  return index !== -1;
}

const tagsDataFilter = computed(() => {
  return tagsData.value.filter((value) => {
    return !isSelected(value.id);
  });
});

onMounted(() => {
  getTagsList().then(({ data }) => {
    tagsData.value = data.data;
  });
});
</script>

<style scoped lang="scss">
.selectHide {
  display: none;
}

.add-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  max-width: 60px;
  padding: 6px 8px;
  background-color: var(--primary);
  color: var(--white);
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  max-height: 32px;

  .icon {
    width: 12px;
    height: 12px;
    cursor: pointer;
    &.icon-plus {
      mask-image: url("@/assets/image/icon/plus.svg");
      background-color: var(--white);
      mask-size: contain;
    }
  }
}
.custom-select {
  outline: none;
  z-index: 9;

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
    border-radius: 4px;
    position: absolute;
    left: 0;
    top: 57px;
    width: 220px;

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
