import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onSelectImage,
}) {
  return (
    <li className={s.item}>
      <img
        onClick={() => {
          onSelectImage(largeImageURL, tags);
        }}
        className={s.img}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
