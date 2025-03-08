<script setup>
import { onMounted, ref } from "vue"
import { Plus, Minus, Pencil, CheckCheck } from "lucide-vue-next"
import { useItemStore } from "~/stores/items.js"
import { usePatchItem } from "~/composables/usePatchItem.js"

const itemStore = useItemStore()
const items = ref([])
const lastUpdated = ref(Date.now())
const updateTimeout = useRuntimeConfig().public.timeoutUpdate
const fetchTimeout = useRuntimeConfig().public.timeoutFetch
const patchItem = usePatchItem()
const modalTitle = "Conflict!"
const modalMessage = "Your data was not up to date when you attempted a request. Do you wish to proceed anyway?"
const modalOk = "Proceed"
const modalCancel = "Cancel"
let oldValues = {}

/**If the item was in process of editing (the edit button was clicked) and there was a change in quantity,
 * On conflict the modal is shown.
 * Saving the old value when the edit button is clicked.
 * @param item
 * @param key
 * @returns {Promise<void>}
 **/
const toggleEdit = async (item, key) => {
  if(item.editing) {
    if (oldValues[key] !== item.quantity) {
      try {
        await usePatchItem().patch(item)
      } catch (e) {
        item.showMessage =  true
      }
    }
  } else {
    oldValues[key] = item.quantity
  }

  item.editing = !item.editing
}

/**
 * Request update item then set last updated to the new value.
 * @param item
 * @param force
 * @returns {Promise<void>}
 */
const update = async (item, force) => {
  const patched = await patchItem.patch(item, force)

  item.last_updated = patched.last_updated
}

/**
 * Increase quantity.
 * @param item
 */
const increase = (item) => {
  item.quantity++
}

/**
 * Decrease quantity if it is not zero.
 * @param item
 */
const decrease = (item) => {
  if(item.quantity > 0)
    item.quantity--
}
/**
 * Close modal.
 * @param item
 */
const closeModal = (item) => {
  item.showMessage = false
}

/**
 * Force update item on conflict.
 * @param item
 * @returns {Promise<void>}
 */
const proceed = async (item) => {
  closeModal(item)
  await update(item, true)
}

/**
 * Fetch items then update the last updated text on the UI.
 * @returns {Promise<void>}
 */
const setItemsAfterFetch = async () => {
  await itemStore.fetchItems()

  items.value = itemStore.items

  lastUpdated.value = Date.now()
}

//calling periodic fetch and update
onMounted(async () => {
  await setItemsAfterFetch()
  setInterval(async ()=> {
    await setItemsAfterFetch()
  }, fetchTimeout)
  await patchItem.periodicPatch(updateTimeout)
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
                  span.update-label Updated:
                  br
                  NuxtTime(:datetime="lastUpdated" hour="numeric" minute="numeric" second="numeric" )
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
  @apply p-2
}
.last-updated > div{
  @apply md:shadow-lg p-2 bg-gray-50 text-xs rounded-lg
}
img {
  @apply max-w-full object-contain
}
.img {
  @apply md:max-w-64 md:h-32 overflow-hidden flex justify-center items-center border shadow-lg my-2
}
td, th{
  @apply md:p-4 p-1 text-center border-b
}
.command, input {
  @apply border rounded-lg shadow-lg
}
.command {
  @apply hover:bg-gray-600 hover:text-gray-50
}
button {
  @apply md:p-2 p-1
}
.quantity {
  @apply w-full flex justify-center items-center
}
.update-label {
  @apply max-sm:hidden
}
.update-label + br {
  @apply max-sm:hidden
}
input {
  @apply md:p-2 p-1 w-12
}
</style>