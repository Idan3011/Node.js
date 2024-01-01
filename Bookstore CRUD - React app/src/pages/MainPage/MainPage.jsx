import React, { useEffect, useState } from "react";
import "./MainPage.css";
import BooksSlider from "../../assets/Slider/BooksSlider";

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {}, []);
  return (
    <div className="MainPage">
      <input type="text" placeholder="Search by Title, Author, price, Genre " />
      <BooksSlider />
    </div>
  );
};

export default MainPage;
