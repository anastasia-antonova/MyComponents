<template lang="pug">
.header-mobile(v-if="isMobile")
  img(src="@/assets/image/profile.svg")
  h2 My profile
  .icon.icon-plus(@click="openModal(EnumModalKeys.CreateProject)")
  create-project
.header(v-else)
  .left
    .logo
    ul
      li Your work
      li.active Projects
      li Teams
      button(@click="openModal(EnumModalKeys.CreateProject)") Create
  .right
    form
      input(type="text", placeholder="Search issue or project")
      button.icon-search
    .icons
      button.icon-info
      button.icon-settings
    router-link(:to="'/dashboard/user'")
      img(src="@/assets/image/profile.svg")

  create-project
</template>

<script setup lang="ts">
import { isMobile, addListener } from "@/composables/actionFunctions";
import { currentKey, isOpen, openModal } from "@/composables/modalActions";

import { EnumModalKeys } from "@/constants/enumModalKeys";
import CreateProject from "@/modals/CreateProject.vue";

addListener();
</script>

<style scoped lang="scss">
@import "@/scss/_media";
@import "@/scss/styles";

.header {
  height: 80px;
  padding: 0 40px 0;

  background-color: var(--primary);
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    gap: 46px;
    width: 50%;

    .logo {
      width: 55px;
      height: 100%;
      background-image: url("@/assets/image/logo/logo-header.svg");
      background-repeat: no-repeat;
      background-position: center;
    }

    ul {
      display: flex;
      gap: 20px;

      li {
        font-family: Inter;
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        padding-bottom: 25px;
        padding-top: 29px;
        cursor: pointer;

        &.active {
          border-bottom: 2px solid var(--text);
        }
      }
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    gap: 30px;
    width: 50%;
    align-items: center;

    form {
      position: relative;

      button {
        border: none;
        outline: none;
        border-radius: 3px;
        height: 20px;
        width: 20px;
        position: absolute;
        top: 12px;
        left: 12px;
        cursor: pointer;
        background-color: inherit;
      }

      input {
        width: 280px;
        height: 42px;
        padding-left: 50px;
        box-sizing: border-box;
        background-color: inherit;
        outline: none;
        border-radius: 4px;
        border: solid 1px var(--accept);

        &::placeholder {
          font-family: Inter;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          color: var(--text);
        }
      }
    }

    .icons {
      display: flex;
      gap: 16px;
      button {
        width: 32px;
        height: 32px;
        border: none;
        cursor: pointer;
        background-color: inherit;
      }
    }
  }
}
.header-mobile {
  background-color: var(--accept);
  padding: 6px 16px;
  display: flex;
  align-items: center;

  h2 {
    color: white;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    text-align: center;
    margin: auto;
    padding-right: 44px;
  }

  .icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    mask-size: cover;
    z-index: 9;
    &.icon-plus {
      mask-image: url("@/assets/image/plus.svg");
      background-color: var(--white);
    }
  }
}
</style>
