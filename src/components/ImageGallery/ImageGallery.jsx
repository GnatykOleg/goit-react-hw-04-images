import { ImageGalleryItem } from 'components';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onSelectImage }) {
  return (
    <ul className={s.imageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onSelectImage={onSelectImage}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
