export const usePatchItem = () => {
    const patch = async (item, force = false) => {
        return await $fetch(`/api/items/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: item.quantity, last_updated: item.last_updated, force })
        })
    }
    const periodicPatch = async (timeout) => {
        setInterval(()=> {
            const item =     { id: 2, quantity: Math.round(Math.random() * 20), last_updated: Date.now()}
            patch(item)
        }, timeout)
    }

    return { patch, periodicPatch }
}