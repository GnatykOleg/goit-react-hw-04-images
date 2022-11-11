import { ImageGalleryItem } from 'components';
import PropTypes from 'prop-types';
import Container from '../Container/Container';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images, onSelectImage }) {
  return (
    <section>
      <main>
        <Container>
          <ul className={s.list}>
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
        </Container>
      </main>
    </section>
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
