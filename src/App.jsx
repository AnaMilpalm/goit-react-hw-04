import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loading from "./components/Loading/Loading";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import React from 'react';
import ImageModal from "./components/ImageModal/ImageModal";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isError, setIsError] = useState(false);
  const [isSearchAttempted, setIsSearchAttempted] = useState(false); 


  const handleSearch = (newQuery) => {
    setIsSearchAttempted(true);

    if(newQuery.trim() === '') {
      toast.warning('Please fill a searching field!');
      setIsSearchAttempted(true);
    } else {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setIsSearchAttempted(false);
     }
     
  };

  useEffect(() => {
   
    if (isSearchAttempted && !query) {
      toast.warning('Please fill a searching field!'); 
      setIsSearchAttempted(true);
      return; 
    }

    async function fetchData() {
      try {
        setLoading(true);
        setIsError(false);
        const url = query
          ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=s8iCvl-a7Zb2qE0wgVuqRid5TbMOqCqrEHbjrKvkTTE`
          : `https://api.unsplash.com/photos/?client_id=s8iCvl-a7Zb2qE0wgVuqRid5TbMOqCqrEHbjrKvkTTE`;

        const response = await axios.get(url);

        if (response.data.results.length === 0 && page === 1) {
          toast.warning('No images matching your search query. Please try again!');
        } else {
          setImages((prevImages) => [
            ...prevImages,
            ...(response.data.results || response.data),
          ]);
          setTotalResults(response.data.total || 0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        toast.error('Failed to load images! Try again!');
      } finally {
        setLoading(false);
      
      }
    }

    if (query || page > 1) {
      fetchData();
    }
  }, [query, page, isSearchAttempted]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMoreImages = totalResults > images.length;

  function openModal(image) {
    setSelectedImage(image); 
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  return (
    <div className="wrapper">
      <SearchBar onSearch={handleSearch} />
      {loading && <Loading />}
      {hasMoreImages > 0 && !loading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ToastContainer autoClose={3000} />
      <ImageGallery images={images} openModal={openModal} />
      <ImageModal 
        image={selectedImage}
        closeModal={closeModal}
        openModal={modalIsOpen}
      />
    </div>
  );
};

export default App;
