import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import axios from "../../data/apiConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./BooksSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BooksSlider = ({ filterdBooks,setBookReview, setBookCliked }) => {
  const [bookstore, setBookStore] = useState([]);
  const sliderRef = useRef(null);
  
  useEffect(() => {}, [filterdBooks]);


  const handleClick =(bookName)=>{
    setBookReview(bookName)
    setBookCliked(true)
  }
  const ArrowLeft = (props) => (
    <button
      onClick={() => sliderRef.current.slickPrev()}
      className="slick-arrow slick-prev"
    ></button>
  );

  const ArrowRight = (props) => (
    <button
      onClick={() => sliderRef.current.slickNext()}
      className="slick-arrow slick-next"
    ></button>
  );
    const slidesLength = filterdBooks.length>0 ? filterdBooks.length : 2
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(2, slidesLength),
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };
  useEffect(() => {
    const fetchBookStore = async () => {
      try {
        const res = await axios.get("/EBookStore");
        const bookstore = res.data;
        setBookStore([...bookstore]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookStore();
  }, []);
  return (
    <>
      {filterdBooks.length === 0 ? (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {bookstore.map((book, index) => (
              <div key={index} className="card-container" onClick={()=>handleClick(book.title)}>
                <img src={book.coverImage} alt={book.title} />
                <h4>{book.title}</h4>
                <ProgressBar
                  now={book.readingProgress}
                  striped
                  animated
                  label={`${book.readingProgress}%`}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {filterdBooks.map((book, index) => (
              <div key={index} className="card-container" onClick={()=>handleClick(book.title)} >
                <img src={book.coverImage} alt={book.title} />
                <h4>{book.title}</h4>
                <ProgressBar
                  now={book.readingProgress}
                  striped
                  animated
                  label={`${book.readingProgress}%`}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default BooksSlider;
