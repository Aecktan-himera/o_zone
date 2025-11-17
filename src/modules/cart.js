const cart = () => {
const cartBtn = document.getElementById('cart')
const cartModal = document.querySelector('.cart')
const cartCloseBtn = cartModal.querySelector('.cart-close')

const openCart = () => {
   // Открытие модального окна 
    cartModal.style.display = 'flex'
}

const closeCart = () => {
   // Закрытие модального окна 
    cartModal.style.display = ''
}

cartBtn.addEventListener('click', openCart)
cartCloseBtn.addEventListener('click', closeCart)

}

export default cart;