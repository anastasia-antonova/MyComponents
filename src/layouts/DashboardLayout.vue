<template lang="pug">
transition(name="fade", mode="out-in")
  .main
    page-header
    router-view
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import { openModal } from "@/composables/modalActions";
import { EnumModalKeys } from "@/constants/enumModalKeys";
import { onMounted } from "vue";
import { getUser } from "@/services/userApi";
import { UserInterface } from "@/types/UserInterface";
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
