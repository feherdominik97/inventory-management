<script setup>
import { ref } from "vue"
import { Plus, Minus } from "lucide-vue-next";

const items = ref([
  { id: 1, name: "Product 1", image_url: "/images/t_shirts.jpg", quantity: 10, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
  { id: 2, name: "Product 2", image_url: "/images/t_shirts.jpg", quantity: 5, editing: false },
])

const toggleEdit = (item) => {
  item.editing = !item.editing
}
const increase = (item) => {
  item.quantity++
}
const decrease = (item) => {
  if(item.quantity > 0)
    item.quantity--
}

</script>
<template lang="pug">
    .content-container
      .table-container
        table
          thead
            tr
              th Image
              th Name
              th Quantity
              th Input
          tbody
            tr(v-for="(item, key) in items")
              td.img
                img.object-contain.border.rounded(:src="item.image_url" :alt="'Product' + key")
              td {{ item.name }}
              td
                .quantity
                  button(:disabled="!item.editing" @click="increase(item)")
                    Minus
                  input(:disabled="!item.editing" type="number" min="0" :value="item.quantity")
                  button(:disabled="!item.editing" @click="decrease(item)")
                    Plus
              td
                button.command(@click="toggleEdit(item)") {{ item.editing ? 'Save' : 'Edit' }}
</template>
<style>
.table-container {
  @apply rounded-2xl
}
.img {
  @apply w-64
}
td, th{
  @apply p-4 text-center
}
.command, input {
  @apply border rounded-lg
}
button {
  @apply p-2
}
.quantity {
  @apply w-full flex justify-center items-center
}
body {
  @apply bg-gray-200 text-gray-600
}
input {
  @apply p-2 w-12
}
</style>