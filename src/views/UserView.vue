<template lang="pug">
.test(v-if="isLoader")
  .banner
  .body
    .main-content
      .user-image-form
        .upload-image
          .shadow
           .icon.icon-image
      LoaderComponent


template(v-else)
  .banner
    .image-banner
      input(v-show="showForm" @change="onFileChangeBanner($event)" name="img" accept="image/*" type="file")
      img.image-show(v-if="baseBanner" :src="JSON.parse(JSON.stringify(baseBanner))" alt="upload-im")
      .container-upload(v-show="showForm" )
         .icon.icon-image
         p Add your header image
  .body(v-if="userData")
    .main-content
      .user-image-form
        .upload-image(v-if="showForm")
          .shadow
           .icon.icon-image
          input(type="file" @change="onFileChangeUser($event)" accept="image/*")
          img(:src="JSON.parse(JSON.stringify(baseUserImage))" alt="name")
        template(v-else-if="baseUserImage")
          img.imgUser(:src="JSON.parse(JSON.stringify(baseUserImage))" alt="name")
        template(v-else)
          img(:src="genderImage" alt="name")
      .user-info
        .name
          h2 {{  userData!.name  }} {{  userData!.surname  }}
          p {{  userData!.username  }}

        .info(v-if="!showForm")
          .work
            h2 Work
            .item
              .container-title
                .icon.icon-member
                p Manager

              p.bold {{  userData!.manager  }}

            .item.bottom
              .container-title
                .icon.icon-department
                p Department

              p.bold {{  userData!.department  }}

          .work
            h2 Contact
            .item
              .container-title
               .icon.icon-letter
               p Mail
              p.bold.dots {{  userData!.email  }}

            .item
              .container-title
               .icon.icon-call
               p Phone
              p.bold {{  userData!.phone  }}

            .item
              .container-title
               .icon.icon-github
               p GitHub
              p.bold {{  userData!.gitHub  }}

            .item.bottom
              .container-title
               .icon.icon-gitlab
               p GitLab
              p.bold {{  userData!.gitLab  }}


        .info.edit(v-if="showForm")
          .work
            h2 Work
            .item
             .icon.icon-member
             .form-edit
                  label(for="manager") Manager
                  input#manager(type="text" v-model="userData!.manager" )

            .item
              .icon.icon-member
              .form-edit
                label(for="juniors") Juniors
                input#juniors(type="text" )

            .item.bottom
              .icon.icon-department
              .form-edit
                label(for="manager") Department
                input#manager(type="text" v-model="userData!.department " )


          .work
            h2 Contact
            .item
              .icon.icon-letter
              .form-edit
                  label(for="mail") Mail
                  input#mail(type="text" v-model="userData!.email" )
            .item
              .icon.icon-call
              .form-edit
                  label(for="phone") Phone
                  input#phone(type="text" v-model="userData!.phone" )
            .item
              .icon.icon-github
              .form-edit
                label(for="gitHub") GitHub
                input#gitHub(type="text" v-model="userData!.gitHub" )

            .item.bottom
              .icon.icon-gitlab
              .form-edit
                  label(for="gitLab") GitLab
                  input#gitLab(type="text" v-model="userData!.gitLab " )


      .details
        .edit
          h2 Details

          button(v-if="!showForm", @click="showForm = true").btn-icon.primary Edit
            .icon.icon-edit
          button.btn-icon.primary.save(:class="{ loader_button: isButtonLoader }" v-show="showForm", @click="saveEdit" ) Save
           .example
             .loader-content
           .icon.icon-edit
        .info(v-if="showForm")
          .work
            .item
              .icon.icon-name
              .form-edit
                label(for="name") Name
                input#name(type="text" v-model="userData!.name" )

            .item
              .icon.icon-surname
              .form-edit
                 label(for="surname") Surname
                 input#surname(type="text" v-model="userData!.surname" )

            .item
              .icon.icon-nickname
              .form-edit
                label(for="nickname") Nickname
                input#nickname(type="text")

            .item

              .icon.icon-gender
              .form-edit
                  label(for="gender") Gender
                  input#gender(type="text" v-model="userData!.gender" )
            .item

              .icon.icon-birth
              .form-edit
                  label(for="birthDate") Birth Date
                  input#birthDate(type="text" v-model="userData!.birthDate" )
            .item

              .icon.icon-company
              .form-edit
                  label(for="position") Position
                  input#position(type="text" v-model=" userData!.position" )
            .item

              .icon.icon-visible
              .form-edit
                label(for="profile") Profile
                textarea#profile( v-model="userData!.profile" )

            .item.bottom

              .icon.icon-compass
              .form-edit
                label(for="address") Profile
                input#address( v-model="userData!.address" )

        .info(v-if="!showForm")
          .work
            .item
              .container-title
               .icon.icon-gender
               p Gender
              p.bold {{  userData!.gender  }}
            .item
              .container-title
               .icon.icon-birth
               p Birth Date
              p.bold {{  userData!.birthDate  }}
            .item
              .container-title
               .icon.icon-company
               p Position
              p.bold {{  userData!.position }}
            .item
              .container-title
               .icon.icon-visible
               p Profile
              p.bold.wrap {{  userData!.profile }}
            .item.bottom
              .container-title
               .icon.icon-compass
               p Address
              p.bold {{  userData!.address  }}

    button.primary.btn-mobile(v-if="isMobile") edit
</template>

<script setup lang="ts">
import { isMobile, addListener, listener } from "@/composables/actionFunctions";
import { computed, onMounted, reactive, ref } from "vue";
import { changeUser, getUser } from "@/services/userApi";
import { UserInterface } from "@/types/UserInterface";
import LoaderComponent from "@/components/common/LoaderComponent.vue";
import { addToast } from "@/composables/toaster";
import { ToasterTypes } from "@/constants/toasterTypes";
const showForm = ref(false);
const baseBanner = ref("");
const baseUserImage = ref("");
const isLoader = ref(false);
const isButtonLoader = ref(false);

const userData = ref<UserInterface | undefined>(undefined);
addListener();
const genderImage = computed(() => {
  return require(`@/assets/image/${userData.value!.gender}.png`);
});
onMounted(() => {
  isLoader.value = true;
  getUser()
    .then(({ data }: { data: UserInterface }) => {
      userData.value = data;
      baseUserImage.value = data.image;
    })
    .finally(() => {
      isLoader.value = false;
    });
});

const onFileChangeBanner = ($event: Event) => {
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
        baseBanner.value = res as string;
      }
    });
  }
};
const onFileChangeUser = ($event: Event) => {
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
        baseUserImage.value = res as string;
      }
    });
  }
};

function saveEdit() {
  isButtonLoader.value = true;
  changeUser(userData.value!.id, {
    name: userData.value!.name,
    manager: userData.value!.manager,
    department: userData.value!.department,
    email: userData.value!.email,
    phone: userData.value!.phone,
    gitHub: userData.value!.gitHub,
    gitLab: userData.value!.gitLab,
    surname: userData.value!.surname,
    gender: userData.value!.gender,
    birthDate: userData.value!.birthDate,
    position: userData.value!.position,
    profile: userData.value!.profile,
    address: userData.value!.address,
    image: baseUserImage.value,
    banner: baseBanner.value,
  })
    .then()
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
      showForm.value = false;
    });
}
</script>

<style scoped lang="scss">
@import "@/scss/_media";
@import "@/scss/styles";

.test {
  width: 100%;
  height: 100vh;

  .body {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    min-height: 100vh;
    .main-content {
      align-items: center;
      justify-content: center;
      width: 945px;
      max-height: 100vh;
    }

    .user-image-form {
      background-color: var(--secondary);

      .upload-image {
        .shadow {
          background-color: inherit;
        }
      }
    }
  }
}

.banner {
  width: 100%;
  height: 120px;
  background-color: var(--secondary);
  position: relative;
  z-index: 1;
  @include media_mobile {
    height: 100px;
    position: absolute;
  }

  .image-banner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    position: relative;

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
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      position: absolute;
      background-color: black;
      opacity: 60%;

      .upload-image {
      }

      p {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        color: white;
      }

      .icon {
        width: 30px;
        height: 24px;
        mask-size: cover;
      }
    }

    .image-show {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}

.body {
  display: flex;
  justify-content: center;
  gap: 50px;
  min-height: 100%;
  padding: 39px 0 36px;
  background-color: var(--background);
  position: relative;
  z-index: 2;

  @include media_mobile {
    display: flex;
    flex-direction: column;
    border-radius: 25px 25px 0 0;
    gap: inherit;
    margin-top: 58px;
  }

  .main-content {
    display: flex;
    gap: 50px;
    max-width: 924px;
    position: relative;

    @include media_mobile {
      flex-direction: column;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      z-index: 1;
      position: relative;
      max-height: 130px;
    }

    .user-image-form {
      position: absolute;
      top: -124px;
      left: 0;
      width: 130px;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: solid 3px rgb(255, 255, 255);

      @include media_mobile {
        top: -83px;
        left: 120px;
        width: 100px;
        height: 92px;
      }

      .upload-image {
        width: 100%;
        height: 100%;
      }

      .shadow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        border-radius: 50%;

        .icon {
          width: 40px;
          height: 32px;
          z-index: 5;
          mask-size: cover;
          position: absolute;
        }
      }

      input {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
        position: absolute;
        z-index: 4;
      }
    }
  }

  .btn-mobile {
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  img {
    &.imgUser {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: 28px;
    position: relative;

    @include media_mobile {
      align-items: center;
    }

    .name {
      margin-top: 23px;

      @include media_mobile {
        max-width: 186px;

        p {
          text-align: center;
        }
      }
      h2 {
        font-family: Inter;
        font-size: 24px;
        line-height: 28px;
        font-weight: 600;
        color: var(--text);
      }
      p {
        font-family: Inter;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: var(--text);
      }
    }
    .info {
      &.hide {
        display: none;
      }
      .work {
        h2 {
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--text);
        }
        .item {
          display: flex;
          gap: 12px;
          align-items: center;
          border-top: 1px solid var(--secondary);
          padding: 14px 0 14px;

          &.bottom {
            border-bottom: 1px solid var(--secondary);
          }

          p {
            font-size: 14px;
            line-height: 20px;
            width: 134px;

            &.dots {
              max-width: 134px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 516px;

    @include media_mobile {
      width: 100%;
      margin-bottom: 15px;
    }

    .info {
      width: 100%;

      .item {
        display: flex;
        gap: 12px;
        .form-edit {
          flex-direction: row;
          align-items: center;
        }
      }
    }
    .edit {
      display: flex;
      justify-content: space-between;
      width: 100%;

      h2 {
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;

        @include media_mobile {
          font-size: 16px;
          line-height: 24px;
          font-weight: 500;
          color: var(--text);
          padding-left: 12px;
        }
      }

      label {
        min-width: 171px;
      }

      button {
        @include media_mobile {
          display: none;
        }
      }
    }
  }
}
</style>
