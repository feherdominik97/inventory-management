<script setup>
import { XIcon } from "lucide-vue-next";

defineProps({
  title: String,
  message: String,
  okButtonText: String,
  cancelButtonText: String
})

const emit = defineEmits(['cancel', 'ok'])
const cancel = () => {
  emit('cancel')
}

const ok = () => {
  emit('ok')
}

</script>
<template lang="pug">
  .modal-container
    .blur-overlay
    .modal
      .title
        h1
          b {{ title }}
        button(@click="cancel()").x
          XIcon

      .message
        p {{ message }}
      .buttons
        button(@click="cancel()").cancel {{ cancelButtonText }}
        button(@click="ok()").ok {{ okButtonText }}

</template>
<style>
.modal-container {
  @apply fixed inset-0 h-screen flex justify-center items-center
}
.blur-overlay {
  @apply absolute inset-0 backdrop-blur-lg
}
.modal {
  @apply relative rounded-lg w-1/3 bg-white py-2 px-4 shadow-lg
}
.title {
  @apply flex items-center w-full text-xl
}
.x {
  @apply ml-auto rounded-lg p-1 hover:bg-red-400 hover:text-gray-50
}
.message {
  @apply text-sm leading-6 py-2
}
.buttons {
  @apply flex justify-end gap-4
}
.ok, .cancel {
  @apply rounded-lg p-2 border
}
.ok {
  @apply hover:bg-gray-600 hover:text-gray-50
}
.cancel {
  @apply hover:bg-red-400 hover:text-gray-50
}
</style>