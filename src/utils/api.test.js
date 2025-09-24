import { Api } from "./api.js";

describe("Api", () => {
  let api;
  let mockFetch;

  // Prepara o ambiente de teste antes de cada teste

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    api = new Api({
      baseUrl: "https://test-api.com",
      headers: { Authorization: "test-token" },
    });
  });

  it("Deve buscar informacao do usuario corretamente", async () => {
    const fakeData = { name: "Jane Doe", about: "Teste" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeData),
    });

    const userInfo = await api.getUserInfo();

    expect(mockFetch).toHaveBeenCalledWith("https://test-api.com/users/me", {
      method: "GET",
      headers: { Authorization: "test-token" },
    });

    expect(userInfo).toEqual(fakeData);
  });

  it("Deve lancar um erro quando busca por informacao do usuario falhar", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });
    await expect(api.getUserInfo()).rejects.toThrow("Error: 404");
  });

  it("Deve atualizar as informacoes do usuario corretamente", async () => {
    const fakeData = { name: "Jhon Doe", about: "Teste" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeData),
    });

    const newInfo = { name: "Jhon Doe", about: "Teste" };
    const updated = await api.setUserInfo(newInfo);

    expect(mockFetch).toHaveBeenCalledWith("https://test-api.com/users/me", {
      method: "PATCH",
      headers: {
        Authorization: "test-token",
      },
      body: JSON.stringify(newInfo),
    });

    expect(updated).toEqual(newInfo);
  });

  it("Deve atualizar a foto do usuario corretamente", async () => {
    const mockResponseData = {
      name: "Jane Doe",
      about: "Teste",
      avatar: "https://new-photo.com",
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseData),
    });

    const newPhotoUrl = "https://new-photo.com";
    const updated = await api.setNewPhoto(newPhotoUrl);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://test-api.com/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          Authorization: "test-token",
        },
        body: JSON.stringify({
          avatar: newPhotoUrl,
        }),
      }
    );

    expect(updated).toEqual(mockResponseData);
  });

  it("Deve buscar cards iniciais invertido ", async () => {
    const mockResponseCard = [{ id: 1 }, { id: 2 }, { id: 3 }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseCard),
    });

    const cards = await api.getInicialCards();

    expect(mockFetch).toHaveBeenCalledWith("https://test-api.com/cards/", {
      method: "GET",
      headers: { Authorization: "test-token" },
    });

    expect(cards).toEqual(mockResponseCard.reverse());
  });

  it("Deve lancar erro quando a busca por cards falhar", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(api.getInicialCards()).rejects.toThrow(
      "Erro ao buscar cards: 500"
    );
  });

  it("Deve adicionar um card corretamente", async () => {
    const newCard = { name: "Novo Card", link: "https://link-do-card.com" };
    const mockResponseNewCard = { id: "123", ...newCard };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseNewCard),
    });

    const addedCard = await api.addCard(newCard);

    expect(mockFetch).toHaveBeenCalledWith("https://test-api.com/cards", {
      method: "POST",
      headers: { Authorization: "test-token" },
      body: JSON.stringify(newCard),
    });

    expect(addedCard).toEqual(mockResponseNewCard);
  });

  it("Deve lancar erro quando a adicao do card falhar", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    });

    await expect(
      api.addCard({ name: "Falha", link: "https://erro.com" })
    ).rejects.toThrow("Error ao adicionar card: 400");
  });

  it("Deve eliminar um card corretamente", async () => {
    const mockResponseDeleteCard = { id: "123" };

    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    await api.deleteCard(mockResponseDeleteCard);

    expect(mockFetch).toHaveBeenCalledWith(
      `https://test-api.com/cards/${mockResponseDeleteCard}`,
      {
        method: "DELETE",
        headers: { Authorization: "test-token" },
      }
    );
  });

  it("Deve lancar erro quando a eliminacao do card falhar", async () => {
    const mockResponseDeleteCard = { id: "456" };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(api.deleteCard(mockResponseDeleteCard)).rejects.toThrow(
      "Error deleting card: 404"
    );
  });

  it("Deve dar like em um card corretamente", async () => {
    const mockResponseCardLike = { id: "123", likes: ["user1"] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseCardLike),
    });

    const result = await api.likeCard(mockResponseCardLike.id);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test-api.com/cards/${mockResponseCardLike.id}/likes`,
      {
        method: "PUT",
        headers: { Authorization: "test-token" },
      }
    );
    expect(result).toEqual(mockResponseCardLike);
  });

  it("Deve lancar erro quando dar like em um card falhar", async () => {
    const cardId = "456";

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    });

    await expect(api.likeCard(cardId)).rejects.toThrow(
      "Error liking card: 400"
    );
  });

  it("Deve remover like em um card corretamente", async () => {
    const mockResponseCardLike = { id: "123", likes: [] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponseCardLike),
    });

    const result = await api.dislikeCard(mockResponseCardLike.id);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://test-api.com/cards/${mockResponseCardLike.id}/likes`,
      {
        method: "DELETE",
        headers: { Authorization: "test-token" },
      }
    );
    expect(result).toEqual(mockResponseCardLike);
  });

  it("Deve lancar erro quando dar like em um card falhar", async () => {
    const cardId = "456";

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    });

    await expect(api.likeCard(cardId)).rejects.toThrow(
      "Error liking card: 400"
    );
  });
});
