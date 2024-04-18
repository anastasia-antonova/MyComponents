<template lang="pug">
app-modal(:is-open="isOpen(EnumModalKeys.CreateProject)", @close="closeModal")
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
        .container-upload(
          :class="getValidationClass($v, 'logo')",
          v-if="!form.logo"
        )
          input(
            @change="onFileChange($event)",
            name="img",
            accept="image/*",
            type="file"
          )
          .image-container
            .icon.icon-image
          p Upload a check image (click or drag)JPG, PNG, WEBP (up to 1 mb)
          span.error(v-if="$v.logo.required.$invalid") Required field

        .container-show(v-if="form.logo")
          img.image-show(
            :src="JSON.parse(JSON.stringify(form.logo))",
            alt="upload-im"
          )
          .close-image(@click="closeImage")
            .icon-close
      .modal-tags
        .tags-container
          h2 Tags:
          .show-tags
            .item-tag(v-for="(item, index) of selectedTags", :key="index")
              p {{ item.attributes.name }}
                .icon.icon-close(@click="deleteItem(item.id)")
        dropdawn-tags(
          :selected="selectedTags",
          @add-tag="selectedTags.push($event)"
        )
      .modal-input
        .item.width-70(:class="getValidationClass($v, 'lead')")
          label(for="lead") Lead
          custom-dropdown
          span.error(v-if="$v.lead.required.$invalid") Required field
        .item(:class="getValidationClass($v, 'members')")
          label(for="members") Members
          custom-multy-dropdown
          span.error(v-if="$v.members.required.$invalid") Required field

    .modal-footer
      button.btn__default.btn__outline(@click="closeModal") Cancel

      button.btn__default.btn__action(
        @click="handleCreateProjectItem",
        :class="{ loader_button: isButtonLoader }"
      ) Create
        .example
          .loader-content
</template>

<script setup lang="ts">
import { isOpen, openModal } from "@/composables/modalActions";
import { EnumModalKeys } from "@/constants/enumModalKeys";
import AppModal from "@/modals/AppModal.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { ProjectInterface } from "@/types/ProjectInterface";
import { createProjectItem } from "@/services/projectApi";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { checkValidation, getValidationClass } from "@/composables/validation";
import { addToast } from "@/composables/toaster";
import { ToasterTypes } from "@/constants/toasterTypes";
import CustomDropdown from "@/components/common/CustomDropdown.vue";
import CustomMultyDropdown from "@/components/common/CustomMultyDropdown.vue";
import DropdawnTags from "@/components/common/DropdawnTags.vue";
import { TagsTypes } from "@/types/TagsTypes";

const selectedTags = ref<TagsTypes[]>([]);

const open = ref(false);

const isButtonLoader = ref(false);

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
    logo: { required },
    description: { required },
    lead: { required },
    members: { required },
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

function closeModal() {
  reset();
  openModal(EnumModalKeys.CreateProject);
}
function handleCreateProjectItem() {
  if (checkValidation($v.value)) {
    return;
  }
  createProjectItem(form)
    .then(() => {
      isButtonLoader.value = true;
      reset();
      openModal(EnumModalKeys.CreateProject);
    })
    .catch((error) => {
      addToast({
        status: ToasterTypes.error,
        message: `${error.message}`,
      });
      console.log(error);
      console.error(
        `An error occurred while updating the user profile: ${error.message}`
      );
    })
    .finally(() => {
      isButtonLoader.value = false;
    });
}

function closeImage() {
  form.logo = "";
}

function reset() {
  form.title = "";
  form.logo = "";
  form.description = "";
  form.key = "";
  form.lead = "";
  form.members = "";
  $v.value.$reset();
}

function deleteItem(id: number) {
  if (selectedTags.value) {
    const index = selectedTags.value.findIndex((value) => {
      return value.id === id;
    });
    if (index !== -1) {
      selectedTags.value.splice(index, 1);
    }
  }
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
          input,
          textarea {
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

        span {
          display: none;
        }

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

      .container-show {
        width: 70px;
        height: 70px;
        position: relative;

        .image-show {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }

        .close-image {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background-color: var(--white);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 50%;

          .icon-close {
            width: 9px;
            height: 9px;
            mask-size: cover;
            mask-image: url("@/assets/image/close.svg");
            background-color: var(--primary);
          }
        }
      }
    }
    .modal-tags {
      display: flex;
      gap: 8px;
      align-items: center;
      position: relative;
      .tags-container {
        display: flex;
        align-items: center;
        gap: 8px;

        .show-tags {
          display: flex;
          gap: 8px;

          .item-tag {
            p {
              display: flex;
              gap: 4px;
              align-items: center;
              flex-direction: row-reverse;
              padding: 6px 8px;
              background-color: var(--accept);
              color: var(--white);
              border-radius: 8px;
              font-size: 14px;
              line-height: 20px;
              max-height: 32px;

              .icon {
                width: 10px;
                height: 10px;
                &.icon-close {
                  mask-image: url("@/assets/image/close.svg");
                  background-color: var(--white);
                }
              }
            }
          }
        }
      }
      h2 {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
      }
      .add-tags {
        background-color: var(--primary);
        width: fit-content;
        border-radius: 8px;
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 6px 8px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: var(--white);
        .icon {
          width: 12px;
          &.icon-plus {
            mask-image: url("@/assets/image/icon/plus.svg");
            background-color: var(--white);
          }
        }
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
        display: flex;
        align-items: center;
        min-width: 100px;
        background-color: var(--accept);
        color: var(--white);
      }
      &.loader-button {
        background-color: black;
      }
    }
  }
}
</style>
