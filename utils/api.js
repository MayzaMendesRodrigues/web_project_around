export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async getUserInfo() {

    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  async setUserInfo({ name, about }) {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error updating user info: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }


  async getInicialCards(){
    const res = await fetch(`${this.baseUrl}/cards/`, {
      method: "GET",
      headers: this.headers,
    })
    if(!res.ok){
      throw new Error (`Erro ao buscar cards: ${res.status} `)
    }
    const data = await res.json();
    return data;
  }

  async addCard({ name, link }) {
 
    const res = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,

      body: JSON.stringify({
        name,
        link,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error ao adicionar card: ${res.status}`);
    }
    const data = await res.json();
    console.log('aqui',data);
    return data;
  }

  async likeCard(cardId) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        like: true,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error liking card: ${res.status}`);
    }
    const data = await res.json();
    return data;
  }


}


export const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "a24baca2-87f5-4e00-a377-0cfb8daf3475",
    "Content-Type": "application/json",
  },
});
