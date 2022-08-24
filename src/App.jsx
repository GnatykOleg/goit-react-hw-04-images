import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Searchbar, ImageGallery, Button, Loader, Modal } from 'components';

export class App extends Component {
  state = {
    largeImageURL: null,
    tags: '',
    value: '',
    images: [],
    error: '',
    status: 'idle',
    showModal: false,
    page: 1,
    perPage: 12,
    totalHits: null,
    API_KEY: '28678536-93e63d5ebc13c605896a6694e',
    BASE_URL: 'https://pixabay.com/api/',
    SETTINGS: 'image_type=photo&orientation=horizontal',
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      this.setState({ status: 'pending' });
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { BASE_URL, value, page, API_KEY, SETTINGS, perPage } = this.state;
    return fetch(
      `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&${SETTINGS}&per_page=${perPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Failed to find any images'));
      })
      .then(images => {
        if (!images.total) {
          this.setState({ status: 'idle' });
          return toast.error('Not find any results', { pauseOnHover: false });
        }
        const imagesToStateFromFetch = images.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesToStateFromFetch],
            status: 'resolved',
            totalHits: images.total,
          };
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  inputValue = value => {
    this.setState({ value, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  onSelectImage = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags, showModal: true });
  };

  render() {
    const { images, showModal, tags, status, largeImageURL, totalHits, page } =
      this.state;
    return (
      <>
        <Searchbar inputValue={this.inputValue} page={page} />
        <ImageGallery images={images} onSelectImage={this.onSelectImage} />
        {totalHits > images.length && status !== 'pending' && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.toggleModal}
            tags={tags}
          />
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer autoClose={2000} position="top-center" />
      </>
    );
  }
}
