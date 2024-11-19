import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loading from "./components/Loading/Loading";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Modal from 'react-modal';
import React from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const url = query
          ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=s8iCvl-a7Zb2qE0wgVuqRid5TbMOqCqrEHbjrKvkTTE`
          : `https://api.unsplash.com/photos/?client_id=s8iCvl-a7Zb2qE0wgVuqRid5TbMOqCqrEHbjrKvkTTE`;

        const response = await axios.get(url);

        if (page === 1) {
          setImages(response.data.results || response.data);
          setTotalResults(response.data.total || 0);
        } else {
          setImages((prevImages) => [
            ...prevImages,
            ...(response.data.results || response.data),
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (query || page > 1) {
      fetchData();
    }
  }, [query, page]);

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
      <ImageGallery images={images} openModal={openModal} />

      {/* Модальне вікно */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            padding: '20px',
          },
        }}
      >
        <button onClick={closeModal}>Close</button>
        {selectedImage && (
          <div className="modal">
            <img src={selectedImage.urls?.regular} alt={selectedImage.alt_description} style={{ width: '100%' }} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
