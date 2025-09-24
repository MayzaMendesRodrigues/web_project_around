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

    expect(userInfo).toEqual(fakeData)
  });
});
