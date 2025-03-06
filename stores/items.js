import { defineStore } from 'pinia'

export const useItemStore = defineStore('items', {
    state: () => ({
        items: []
    }),
    getters: {
        totalItems: (state) => state.items.length
    },
    actions: {
        async fetchItems() {
            try {
                const response = await $fetch("/api/items")

                this.items = await response
            } catch (error) {
                console.error("Error fetching items:", error)
            }
        }
    }
})
