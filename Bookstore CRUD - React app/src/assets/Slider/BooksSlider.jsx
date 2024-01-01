import Slider from "react-slick";
import { useEffect, useState, useRef } from "react";
import axios from "../../data/apiConfig";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./BooksSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BooksSlider = () => {
  const [bookstore, setBookStore] = useState([]);

  const sliderRef = useRef(null);

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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
      {bookstore.length > 0 && (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {bookstore.map((book, index) => (
              <div key={index} className="card-container">
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
