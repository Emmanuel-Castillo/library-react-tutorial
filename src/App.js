import Home from "./pages/Home";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { books } from "./data";    //former fake data: now using api
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  async function getBooks() {
    const promise = await fetch("http://localhost:5000/api/data")
    const response = await promise.json()
    
    setBooks(response.data);
  }

  useEffect(() => {
    getBooks();
  }, []);

  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 , key: book.id}]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });

    return counter;
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
