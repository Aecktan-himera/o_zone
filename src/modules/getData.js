const getData = () => {
    return fetch('https://test-aab26-default-rtdb.firebaseio.com/goods.json')
.then((response) => {
  return response.json()
})    
}

export default getData;