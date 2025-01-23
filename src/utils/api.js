const baseUrl = "http://localhost:3001";
import { getToken } from "./auth";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRes);
}

function addItem({ name, weather, imageUrl }) {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(checkRes);
}

function deleteCard(cardId) {
  return fetch(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  }).then(checkRes);
}

export { getItems, addItem, deleteCard, checkRes };
