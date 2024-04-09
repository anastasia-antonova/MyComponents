<template lang="pug">
.custom-select(:tabindex="tabindex", @blur="open = false")
  .custom-dropdown(:class="{ open: open }", @click="open = !open") {{ selectedUser ? selectedUser.attributes.name : "no data" }}
  ul(:class="{ selectHide: !open }")
    li(
      v-for="(item, index) of leadData",
      :key="index",
      @click="selectOption(item.id)"
    ) {{ item.attributes.name }}
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
    selected.value = data.data[0].id;
  });
});
</script>

<style scoped lang="scss">
.selectHide {
  display: none;
}
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;

  .custom-dropdown {
    color: #fff;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    border-right: 1px solid #ad8225;
    border-left: 1px solid #ad8225;
    border-bottom: 1px solid #ad8225;
    position: absolute;
    background-color: #0a0a0a;
    left: 0;
    right: 0;
    z-index: 1;

    ul {
      color: #fff;
      padding-left: 1em;
      cursor: pointer;
      user-select: none;

      li {
        padding-left: 1em;
        cursor: pointer;
        user-select: none;

        &:hover {
          background-color: #ad8225;
        }
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

    &.open {
      border: 1px solid #ad8225;
      border-radius: 6px 6px 0px 0px;
    }

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
