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
        .item(:class="getValidationClass($v, 'title')")
          label(for="title") Title
          input#title(
            type="text",
            placeholder="Test project",
            v-model="form.title",
            @blur="$v.title.$touch()"
          )
          span.error(v-if="$v.title.required.$invalid") Required field

        .item.width-70(:class="getValidationClass($v, 'key')")
          label(for="key") Key
          input#key(
            type="text",
            placeholder="TESP",
            v-model="form.key",
            @blur="$v.key.$touch()"
          )
          span.error(v-if="$v.key.required.$invalid") Required field

      .modal-image
        label Image logo
        .container-upload
          input(
            @change="onFileChange($event)",
            name="img",
            accept="image/*",
            type="file"
          )
          .image-container
            .icon.icon-image
          p Upload a check image (click or drag)JPG, PNG, WEBP (up to 1 mb)

        img.image-show(
          v-if="form.logo",
          :src="JSON.parse(JSON.stringify(form.logo))",
          alt="upload-im"
        )
      .modal-input
        .item
          label(for="title") Description
          textarea(placeholder="Test description", v-model="form.description")

      .modal-input
        .item.width-70
          label(for="lead") Lead
          input#lead(type="text", v-model="form.lead")

        .item
          label(for="members") Members
          input#members(type="text", v-model="form.members")

    .modal-footer
      button.btn__default.btn__outline(
        @click="openModal(EnumModalKeys.CreateProject)"
      ) Cancel
      button.btn__default.btn__action(@click="handleCreateProjectItem") Create
</template>

<script setup lang="ts">
import { isOpen, openModal } from "@/composables/modalActions";
import { EnumModalKeys } from "@/constants/enumModalKeys";
import AppModal from "@/modals/AppModal.vue";
import { computed, reactive, ref, watch } from "vue";
import { ProjectInterface } from "@/types/ProjectInterface";

import { createProjectItem } from "@/services/projectApi";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { checkValidation, getValidationClass } from "@/composables/validation";

const form = reactive({
  title: "",
  logo: "",
  description: "",
  key: "",
  lead: "",
  members: "",
});

const list = ref<ProjectInterface[]>([]);

const rules = computed(() => {
  const rules: { [key: string]: any } = {
    title: { required },
    key: { required },
  };
  return rules;
});

const $v = useVuelidate(rules, form);

watch(
  () => form.title,
  () => {
    form.key = form.title
      .split(" ")
      .map((value) => {
        if (value) {
          return value[0].toUpperCase();
        } else {
          return "";
        }
      })
      .join("");
  }
);
const onFileChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  if (target && target.files && target.files.length) {
    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });

    toBase64(target.files[0]).then((res) => {
      if (target && target.files && target.files.length) {
        form.logo = res as string;
      }
    });
  }
};

function handleCreateProjectItem() {
  createProjectItem(form).then(() => {
    form.title = "";
    form.logo = "";
    form.description = "";
    form.key = "";
    form.lead = "";
    form.members = "";
  });
}
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
        width: 100%;
        display: flex;
        gap: 8px;
        flex-direction: column;

        &.error {
          input {
            border-color: var(--red);
          }

          span {
            display: block;
            font-size: 12px;
            line-height: 18px;
            font-weight: 400;
            color: var(--red);
          }
        }

        label {
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
        }

        input,
        textarea {
          padding: 14px 16px;
          border: 1px solid var(--primary);
          border-radius: 4px;
        }

        textarea {
          min-height: 78px;
          box-sizing: border-box;
        }

        span {
          display: none;
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
      position: relative;
      label {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }
      input {
        width: 100%;
        height: 100%;
        max-height: 120px;
        opacity: 0;
        z-index: 9;
        cursor: pointer;
        position: absolute;
      }

      .container-upload {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        border: 1px dashed var(--primary);
        border-radius: 4px;

        .image-container {
          width: 40px;
          height: 40px;
          border-radius: 4px;
          background-color: var(--secondary);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .upload-image {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: var(--secondary);
        }

        p {
          font-size: 14px;
          line-height: 20px;
          font-weight: 300;
          color: var(--text);
          max-width: 240px;
        }

        .icon {
          width: 20px;
          height: 16px;
          mask-size: cover;
          background-color: var(--white);
        }
      }

      .image-show {
        object-fit: cover;
        width: 70px;
        height: 70px;
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
    padding-top: 32px;
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
