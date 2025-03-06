<script setup>
import { onMounted, ref } from "vue"
import { Plus, Minus, Pencil, CheckCheck } from "lucide-vue-next"
import { useItemStore } from "~/stores/items.js"

const itemStore = useItemStore()
const items = ref([])
const lastUpdated = ref(Date.now())

const toggleEdit = async (item) => {
  if(item.editing) {
    const response = await $fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: item.quantity })
    })

    console.log('Success')
  }

  item.editing = !item.editing
}
const increase = (item) => {
  item.quantity++
}
const decrease = (item) => {
  if(item.quantity > 0)
    item.quantity--
}

onMounted(async () => {
  await itemStore.fetchItems()
  items.value = itemStore.items
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
                button.command(@click="toggleEdit(item)")
                  CheckCheck(v-if="item.editing")
                  Pencil(v-else)

</template>
<style>
.table-container {
  @apply rounded-2xl
}
.last-updated {
  @apply p-6
}
.last-updated > div{
  @apply shadow-lg p-2 bg-gray-50 text-xs
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