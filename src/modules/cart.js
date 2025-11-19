import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
  const cartBtn = document.getElementById("cart");
  const cartModal = document.querySelector(".cart");
  const cartCloseBtn = cartModal.querySelector(".cart-close");
  const cartTotal = cartModal.querySelector(".cart-total > span");
  const cartSendBtn = cartModal.querySelector(".cart-confirm");
  const goodsWrapper = document.querySelector(".goods");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartCounter = document.querySelector(".counter");

  // Функция для обновления состояния кнопки оформления заказа
  const updateSendButton = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    if (cart.length === 0) {
      cartSendBtn.setAttribute("disabled", "disabled");
      cartSendBtn.style.opacity = "0.6";
      cartSendBtn.style.cursor = "not-allowed";
    } else {
      cartSendBtn.removeAttribute("disabled");
      cartSendBtn.style.opacity = "1";
      cartSendBtn.style.cursor = "pointer";
    }
  };

  // Функция для обновления счетчика корзины
  const updateCartCounter = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cartCounter.textContent = cart.length;
  };

  // Инициализация счетчика при загрузке страницы
  updateCartCounter();

  const openCart = () => {
    // Массив с данными для корзины
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    // Открытие модального окна
    cartModal.style.display = "flex";

    // Отрисовка товаров для корзины
    renderCart(cart);
    cartTotal.textContent = cart.reduce((sum, goodItem) => {
      return sum + goodItem.price;
    }, 0);

    // Обновляем состояние кнопки оформления заказа
    updateSendButton();
  };

  const closeCart = () => {
    // Закрытие модального окна
    cartModal.style.display = "";
  };

  cartBtn.addEventListener("click", openCart);
  cartCloseBtn.addEventListener("click", closeCart);

  goodsWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const goods = JSON.parse(localStorage.getItem("goods"));
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const goodItem = goods.find((item) => {
        console.log(item.id);
        return item.id.trim().toLowerCase() === key.trim().toLowerCase();
      });

      cart.push(goodItem);

      localStorage.setItem("cart", JSON.stringify(cart));
      // Обновляем счетчик после добавления товара
      updateCartCounter();
    }
  });

  cartWrapper.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      const card = event.target.closest(".card");
      const key = card.dataset.key;
      const index = cart.findIndex((item) => {
        return item.id === key;
      });

      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      // Обновляем счетчик после удаления товара
      updateCartCounter();

      renderCart(cart);
      cartTotal.textContent = cart.reduce((sum, goodItem) => {
        return sum + goodItem.price;
      }, 0);

      // Обновляем состояние кнопки оформления заказа
      updateSendButton();
    }
  });

  cartSendBtn.addEventListener("click", () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    postData(cart).then(() => {
      localStorage.removeItem("cart");

      renderCart([]);
      cartTotal.textContent = 0;
      // Обновляем счетчик после очистки корзины
      updateCartCounter();

      // Обновляем состояние кнопки оформления заказа
      updateSendButton();
    });
  });
};

export default cart;
