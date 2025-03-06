export const useGetItem = () => {
    const get = async (id) => {
        return await $fetch(`/api/items/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return { get }
}

