/*// @ts-ignore
import { ref, onMounted, onUnmounted } from "vue"

export function useItems() {
    const items = ref([])

    let intervalId = setInterval(()=>{})

    const

    onMounted(() => {
        fetchProducts()
        intervalId = setInterval(fetchProducts, 5000)
    })

    onUnmounted(() => {
        if (intervalId) clearInterval(intervalId)
    })

    return { items }
}*/