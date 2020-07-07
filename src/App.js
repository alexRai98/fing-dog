import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const Spinner = () => {
  return (
    <div className="spinner-grow" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const RenderImages = ({ src }) => {
  return (
    <div className="dog-img">
      <img src={src} key={src} alt="dog" className="images-by-breed" />
    </div>
  );
};

const getBreed = (breeds) => {
  const fetchBreeds = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    breeds(Object.keys(data.message));
  };
  fetchBreeds();
};

const getImageByBreed = (imgsBreed, breed) => {
  if(breed==="Select a breed") return ;
  imgsBreed([]);
  const fetchImgBreeds = async () => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    imgsBreed(data.message);
  };
  fetchImgBreeds();
};

function App() {
  const initialImages = [
    "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    "https://images.dog.ceo/breeds/boxer/n02108089_10229.jpg",
    "https://images.dog.ceo/breeds/akita/An_Akita_Inu_resting.jpg",
    "https://images.dog.ceo/breeds/borzoi/n02090622_10492.jpg",
    "https://images.dog.ceo/breeds/dingo/n02115641_10395.jpg",
    "https://images.dog.ceo/breeds/pitbull/20190801_154956.jpg",
    "https://images.dog.ceo/breeds/chow/n02112137_1005.jpg",
  ];
  const [breeds, setBreeds] = useState([]);
  const [imgByBreed, setImgByBreed] = useState(initialImages);
  const [isSelected, setIsSelected] = useState("Select a breed");
  useEffect(() => {
    getBreed(setBreeds);
  }, []);
  useEffect(() => getImageByBreed(setImgByBreed, isSelected), [isSelected]);

  return (
    <div className="App">
      <h1>Find Dogs</h1>
      <div className="row">
        <div className="btn-group">
          <button type="button" className="btn btn-info">
            {isSelected}
          </button>
          <button
            type="button"
            className="btn btn-info dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></button>
          <div className="dropdown-menu">
            {breeds.map((breed, index) => (
              <button
                type="button"
                onClick={() => {
                  setIsSelected(breed);
                }}
                className="dropdown-item"
                key={index}
              >
                {breed}
              </button>
            ))}
            ;
          </div>
        </div>
      </div>

      <section className="container">
        {imgByBreed.length === 0 && <Spinner />}
        <div className="images-list">
          {imgByBreed.length === 0
            ? null
            : imgByBreed.map((src, index) => (
                <RenderImages src={src} key={index} />
              ))}
        </div>
      </section>
    </div>
  );
}

export default App;
