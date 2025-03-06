<script setup>
import { onMounted, ref } from "vue"
import { Plus, Minus, Pencil, CheckCheck } from "lucide-vue-next"
import { useItemStore } from "~/stores/items.js"
import { usePatchItem } from "~/composables/usePatchItem.js"

const itemStore = useItemStore()
const items = ref([])
const lastUpdated = ref(Date.now())
const timeout = 5000
const patchItem = usePatchItem()
const modalTitle = "Conflict!"
const modalMessage = "Your data was not up to date when you attempted a request. Do you wish to proceed anyway?"
const modalOk = "Proceed"
const modalCancel = "Cancel"
let oldValues = {}

const toggleEdit = async (item, key) => {
  if(item.editing) {
    try {
      await usePatchItem().patch(item)
    } catch (e) {
      item.showMessage =  true
    }
  } else {
    oldValues[key] = item.quantity
  }

  item.editing = !item.editing
}
const update = async (item, force) => {
  const patched = await patchItem.patch(item, force)

  item.last_updated = patched.last_updated
}
const increase = (item) => {
  item.quantity++
}
const decrease = (item) => {
  if(item.quantity > 0)
    item.quantity--
}
const closeModal = (item) => {
  item.showMessage = false
}
const proceed = async (item) => {
  closeModal(item)
  await update(item, true)
}

onMounted(async () => {
  await itemStore.fetchItems()
  items.value = itemStore.items
  await patchItem.periodicPatch(timeout)
})

</script>
<template lang="pug">
    .content-container(v-if="items.length")
      .table-container
        table
          thead
            tr
              th Name
              th Image
              th Quantity
              th.last-updated
                div
                  span Updated:
                  br
                  NuxtTime(:datetime="lastUpdated" year="numeric" month="long" day="numeric" hour="numeric" minute="numeric" second="numeric" )
          tbody
            tr(v-for="(item, key) in items")
              td {{ item.name }}
              td
                .img
                  img(:src="item.image_url" :alt="'Product' + key")
              td
                .quantity
                  button(:disabled="!item.editing" @click="decrease(item)")
                    Minus
                  input(:disabled="!item.editing" type="number" min="0" v-model="item.quantity")
                  button(:disabled="!item.editing" @click="increase(item)")
                    Plus
              td
                button.command(@click="toggleEdit(item, key)")
                  CheckCheck(v-if="item.editing")
                  Pencil(v-else)
              Message(
                v-if="item.showMessage"
                :title="modalTitle"
                :message="modalMessage"
                :cancel-button-text="modalCancel"
                :ok-button-text="modalOk"
                @ok="proceed(item)"
                @cancel="closeModal(item)")

</template>
<style>
.table-container {
  @apply rounded-2xl
}
.last-updated {
  @apply p-6
}
.last-updated > div{
  @apply shadow-lg p-2 bg-gray-50 text-xs rounded-lg
}
img {
  @apply max-w-full object-contain
}
.img {
  @apply max-w-64 h-32 overflow-hidden flex justify-center items-center border shadow-lg my-2
}
td, th{
  @apply p-4 text-center border-b
}
.command, input {
  @apply border rounded-lg shadow-lg
}
.command {
  @apply  hover:bg-gray-600 hover:text-gray-50
}
button {
  @apply p-2
}
.quantity {
  @apply w-full flex justify-center items-center
}
input {
  @apply p-2 w-12
}
</style>