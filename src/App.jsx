import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
// import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

const App = () => {
  const [images, setImages] = useState([]);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get("https://api.unsplash.com/photos/?client_id=s8iCvl-a7Zb2qE0wgVuqRid5TbMOqCqrEHbjrKvkTTE"
        );
        console.log(response.data)
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }  
  }
  fetchData();
},[]);



  return (
    <div>

    {/* <SearchBar /> */}
    <ImageGallery images={images} /> 
     
    </div>
  );
};

export default App;
