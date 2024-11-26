const baseUrl = 'http://localhost:3001';

function getItems() {
    return fetch(`${baseUrl}/items`).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    })
}

function addItem({ name, weather, imageUrl}) {
    return fetch(`${baseUrl}/items`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name, weather, imageUrl })
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    })
}

export { getItems, addItem };