/**
 * @jest-environment jsdom
 */

import { Card } from "../Card.js";
import { api } from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  api: {
    likeCard: jest.fn(),
    dislikeCard: jest.fn(),
  },
}));
const setupDOM = () => {
  const template = document.createElement("template");
  template.id = "cards__template";

  const li = document.createElement("li");
  li.className = "card__template";

  const trashButton = document.createElement("button");
  trashButton.className = "cards__trash";
  trashButton.setAttribute("aria-label", "Excluir post");

  const img = document.createElement("img");
  img.className = "cards__img";

  const content = document.createElement("div");
  content.className = "cards__content";

  const title = document.createElement("p");
  title.className = "cards__title";

  const likeButton = document.createElement("button");
  likeButton.className = "cards__like";
  likeButton.setAttribute("aria-label", "Curtir post");
  content.appendChild(title);
  content.appendChild(likeButton);
  li.appendChild(trashButton);
  li.appendChild(img);
  li.appendChild(content);

  template.content.appendChild(li);

  document.body.appendChild(template);
};

describe("Card", () => {
  const mockName = "Paris";

  const mockLink = "https://example.com/paris.jpg";
  const mockId = "123";
  const mockTemplateSelector = "#cards__template";
  let mockHandleCardClick;
  let mockHandleDeleteCard;
  let cardInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    setupDOM();

    mockHandleCardClick = jest.fn();
    mockHandleDeleteCard = jest.fn();

    cardInstance = new Card(
      mockName,
      mockLink,
      false,
      mockId,
      mockTemplateSelector,
      mockHandleCardClick,
      mockHandleDeleteCard
    );

    api.likeCard.mockResolvedValue({});
    api.dislikeCard.mockResolvedValue({});
  });

  describe("Funcionalidade Básica", () => {
    it("Deve criar o elemento do card corretamente", () => {
      const cardElement = cardInstance.generateCard();
      const image = cardElement.querySelector(".cards__img");
      const title = cardElement.querySelector(".cards__title");
      const likeButton = cardElement.querySelector(".cards__like");

      expect(cardElement).not.toBeNull();
      expect(title.textContent).toBe(mockName);
      expect(image.src).toBe(mockLink);
      expect(image.alt).toBe(mockName);
      expect(likeButton.classList.contains("active")).toBe(false);
    });

    it("Deve adicionar a classe 'active' ao botão de like se _isLiked for true", () => {
      const likedCardInstance = new Card(
        mockName,
        mockLink,
        true, // isLiked = true
        mockId,
        mockTemplateSelector,
        mockHandleCardClick,
        mockHandleDeleteCard
      );
      const cardElement = likedCardInstance.generateCard();
      const likeButton = cardElement.querySelector(".cards__like");

      expect(likeButton.classList.contains("active")).toBe(true);
    });
  });
});
