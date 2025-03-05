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
                const response = await fetch("/api/items")
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch items")
                }
                this.items = await response.json()
            } catch (error) {
                console.error("Error fetching items:", error)
            }
        }
    }
})
