import React, { useEffect, useState } from "react";
import "./BookReview.css";
import axios from "../../data/apiConfig";
import StarRatings from "react-star-ratings";

const BookReview = ({ bookReview }) => {
  const [book, setBook] = useState({});
  console.log(book);

  useEffect(() => {
    const fecthBook = async () => {
      try {
        const res = await axios.get(
          `/EBookStore/title/${bookReview.toLowerCase()}`
        );
        if (res.data) {
          setBook(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fecthBook();
  }, [bookReview]);

  return (
    <>
      <div className="BookReview">
        <img src={book?.coverImage} alt={book?.title} />
        <StarRatings
          rating={book?.averageRating}
          starRatedColor="yellow"
          numberOfStars={5}
          name="rating"
        />
        <h4>{book?.title}</h4>
        <ul>
          <li>
            {book?.publishedIn} <span className="text">Publish in </span>
          </li>
          <li className="middle-li-item">
            {book?.pages} <span className="text">Pages </span>
          </li>
          <li>
            {book?.reviews.length} <span className="text">Total Reviews</span>
          </li>
        </ul>
        <h4>About</h4>
        <p>{book?.description}</p>
      </div>
    </>
  );
};

export default BookReview;
