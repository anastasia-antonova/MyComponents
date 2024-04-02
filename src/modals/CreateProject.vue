<template lang="pug">
app-modal(
  :is-open="isOpen(EnumModalKeys.CreateProject)",
  @close="openModal(EnumModalKeys.CreateProject)"
)
  template(v-slot:content)
    .modal-header
      h3.title-inter Create Project
    .modal-body
      .modal-input
        .item.width-70
          label(for="title") Title
          input#title(type="text")

        .item
          label(for="title") Key
          input#key(type="text")

      .modal-image
        label Image logo
        input(
          @change="onFileChangeLogo($event)",
          name="img",
          accept="image/*",
          type="file"
        )
        img.image-show(
          v-if="baseLogo",
          :src="JSON.parse(JSON.stringify(baseLogo))",
          alt="upload-im"
        )
        .container-upload
          .icon.icon-image
          p Upload a check image (click or drag)JPG, PNG, WEBP (up to 1 mb)

      .modal-input
        .item
          label(for="title") Description
          textarea

    .modal-footer
      button.btn__default.btn__outline Cancel
      button.btn__default.btn__action Create
</template>

<script setup lang="ts">
import { isOpen, openModal } from "@/composables/modalActions";
import { EnumModalKeys } from "@/constants/enumModalKeys";
import AppModal from "@/modals/AppModal.vue";
</script>

<style scoped lang="scss">
@import "@/scss/_media";
@import "@/scss/colors";
@import "@/scss/styles";

.modal {
  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .modal-input {
      display: flex;
      width: 100%;
      gap: 16px;

      .item {
        display: flex;
        gap: 8px;
        flex-direction: column;

        input {
          padding: 14px 16px;
          border: 1px solid var(--primary);
          border-radius: 4px;
        }

        &.width-70 {
          width: 70%;
        }
      }
    }
    .modal-image {
      display: flex;
      flex-direction: column;
      gap: 8px;
      input {
        width: 100%;
        height: 120px;
        opacity: 0;
        z-index: 9;
        cursor: pointer;
        position: absolute;
      }

      .container-upload {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        border: 1px dashed var(--accept);
        border-radius: 4px;

        .upload-image {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: var(--secondary);
        }

        p {
          font-size: 14px;
          line-height: 20px;
          font-weight: 500;
          color: black;
          max-width: 240px;
        }

        .icon {
          width: 30px;
          height: 24px;
          mask-size: cover;
          background-color: black;
        }
      }

      .image-show {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
  &--container {
    .modal-header {
      margin-bottom: 16px;
      .title-inter {
        font-family: Inter;
        font-size: 24px;
        line-height: 28px;
        font-weight: 500;
      }
    }
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    button {
      font-family: Inter;
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      max-width: 101px;
      &.btn__outline {
        border: 1px solid var(--accept);
        color: var(--accept);
      }
      &.btn__action {
        background-color: var(--accept);
        color: var(--white);
      }
    }
  }
}
</style>
