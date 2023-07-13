import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/ui/Rating";
import Price from "../components/ui/Price";
import Book from "../components/ui/Book";

const BookInfo = ({ books, addToCart, cart }) => {
  const {id} = useParams()
  const book = books.find(book => book.id === +id)

  function addBookToCart(book){
    addToCart(book)
  }

  function bookExistsOnCart() {
    return cart.find(book => +book.id === +id)
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to='/books' className="book__link">
                <FontAwesomeIcon icon="arrow-left"/>
              </Link>
              <Link to="/book" className="book__link">
                <h2 className="book__selected--title--top">
                  Books
                </h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">
                  {book.title}
                </h2>
                <Rating rating={book.rating}/>
                <div className="book__selected--price">
                  <Price salePrice={book.salePrice} originalPrice={book.originalPrice}/>
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">
                    Summary 
                  </h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum odit officiis quam maiores quisquam, neque vel sunt quis culpa in, modi omnis quaerat non eius exercitationem ducimus vitae, reiciendis dolor quos! Ipsum cupiditate exercitationem porro itaque ullam eaque molestiae quo cum explicabo, obcaecati molestias labore odio excepturi aliquam magni ratione.
                  </p>
                </div>
                { bookExistsOnCart() ? 
                  <Link to={'/cart'} className="book__link">

                  <button className="btn">Already added: Let's Checkout!</button>
                  </Link>
                 : 
                  <button className="btn" onClick={() => addBookToCart(book)}>Add to Cart
                </button>
                }
                  
              </div>
            </div>
          </div>
        </div>

        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">
                  Recommended Books
              </h2>
            </div>
            <div className="books">

            {
              books
              .filter(book => book.rating === 5 && book.id !== +id)
              .slice(0,4)
              .map(book => <Book book={book} key={book.id}/>)
            }
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default BookInfo
