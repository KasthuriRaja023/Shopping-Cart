import "./styles.css";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { name: "Jacket", stock: 2000 },
    { name: "Pants", stock: 1900 },
    { name: "Scarf", stock: 1850 },
    { name: "Pajamas", stock: 1598 },
    { name: "Shirt", stock: 1958 }
  ]);
  const [cart, setCart] = useState([
    { name: "Jacket", stock: 0 },
    { name: "Pants", stock: 0 },
    { name: "Scarf", stock: 0 },
    { name: "Pajamas", stock: 0 },
    { name: "Shirt", stock: 0 }
  ]);

  const [price, setPrice] = useState([550, 350, 400, 200, 450]);

  const [total, setTotal] = useState(0);

  function addCart(event) {
    let [name, number] = event.target.innerHTML.split(":");
    let isStock = true;
    let newItem = items.map((item) => {
      if (item.name === name) {
        if (item.stock > 0) item.stock--;
        else {
          isStock = false;
          alert("NO Stock");
        }
      }
      return item;
    });

    let newCart = cart.map((item, index) => {
      if (item.name === name) {
        if (isStock) {
          item.stock++;
          console.log(items[index].name);
          console.log(price[index]);
          if (name === items[index].name) setTotal(total + price[index]);
        }
      }
      return item;
    });
    setItems(newItem);
  }

  function deleteCart(event) {
    let [name, number] = event.target.innerHTML.split(":");
    let isStock = true;

    let newCart = cart.map((item, index) => {
      if (item.name === name) {
        if (item.stock > 0) {
          item.stock--;
          if (name === items[index].name) setTotal(total - price[index]);
        } else {
          isStock = false;
          alert("NO Item in cart");
        }
      }
      return item;
    });
    let newItem = items.map((item) => {
      if (item.name === name) {
        if (isStock) item.stock++;
      }
      return item;
    });
    setItems(newItem);
  }

  function createShop(item, index) {
    return (
      <div className="container">
        <div>
          <button key={index} id={index} onClick={addCart}>
            {item.name}:{item.stock}{" "}
          </button>
        </div>
      </div>
    );
  }
  function createCart(item, index) {
    return (
      <button key={index} id={index} onClick={deleteCart}>
        {item.name}:{item.stock}{" "}
      </button>
    );
  }

  const addStock = () => {
    let name = document.getElementById("name").value;
    let stock = document.getElementById("stock").value;
    let productPrice = Number(document.getElementById("productPrice").value);

    let newItemObj = { name, stock };
    let newCartObj = { name, stock: 0 };

    setItems([...items, { ...newItemObj }]);
    setCart([...cart, { ...newCartObj }]);
    setPrice([...price, productPrice]);
  };

  return (
    <>
      <h2>CLOTHING LIST</h2>
      {items.map(createShop)}
      <h2>SHOPPING CART</h2>
      {cart.map(createCart)}
      <br />
      <h2>BILL AMOUNT IS : {total}</h2>
    </>
  );
}
