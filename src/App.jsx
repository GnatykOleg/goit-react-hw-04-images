import { useState, useEffect } from 'react';
import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';
import { ToastContainer, toast } from 'react-toastify';

const API_KEY = '28678536-93e63d5ebc13c605896a6694e';
const BASE_URL = 'https://pixabay.com/api/';
const SETTINGS = 'image_type=photo&orientation=horizontal';

export function App() {
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (value === '') {
      return;
    }
    setStatus('pending');
    const fetchImages = () => {
      return fetch(
        `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&${SETTINGS}&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Failed to find any images'));
        })
        .then(images => {
          if (!images.total) {
            setStatus('idle');
            return toast.error('Not find any results', { pauseOnHover: false });
          }
          return images;
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    };
    fetchImages().then(images => {
      if (images.hits) {
        const imagesToStateFromFetch = images.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        setImages(prevState => [...prevState, ...imagesToStateFromFetch]);
        setStatus('resolved');
        setTotalHits(images.total);
      }
    });
  }, [value, page]);

  const inputValue = value => {
    setValue(value);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const onSelectImage = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    setShowModal(true);
  };

  return (
    <>
      <Searchbar inputValue={inputValue} page={page} />
      <ImageGallery images={images} onSelectImage={onSelectImage} />
      {totalHits > images.length &&
        status !== 'pending' &&
        images.length > 0 && <Button handleLoadMore={handleLoadMore} />}
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          onClose={toggleModal}
          tags={tags}
        />
      )}
      {status === 'pending' && <Loader />}
      <ToastContainer autoClose={2000} position="top-center" />
    </>
  );
}
