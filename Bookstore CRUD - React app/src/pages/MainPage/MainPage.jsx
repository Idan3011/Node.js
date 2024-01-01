import React, { useEffect, useState } from "react";
import "./MainPage.css";
import BooksSlider from "../../assets/Slider/BooksSlider";
import axios from "../../data/apiConfig";
import BookReview from '../../pages/BookReview/BookReview'
const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filterdBooks, setFilterdBooks]= useState([])
  const [bookReview, setBookReview] =useState('')
  const[bookCliked, setBookCliked]= useState(false)
 
  
  useEffect(() => {
    const bookSearch = async () => {
      const res = await axios.get(`/EBookStore/booksearch/${searchInput}`);
     if(res.data){
      setFilterdBooks([...res.data])
     }
    };
    if (searchInput.length >= 1) {
      setTimeout(() => {
        bookSearch();
      }, 1000);
    }
  }, [searchInput]);
  return (
    <div className="MainPage">
      <input
        type="text"
        placeholder="Search by Title, Author, price, Genre "
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <BooksSlider filterdBooks={filterdBooks} setBookReview={setBookReview} setBookCliked={setBookCliked}/>
      <div className="bookreview-container">
        {bookCliked&& <><BookReview  bookReview={bookReview}/></>}
      </div>
    </div>
  );
};

export default MainPage;
