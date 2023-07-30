import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({ images, onOpenModal }) => {
    return (
        <ul className={css.gallery}>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem key={id} onClick={onOpenModal} alt={tags} smallImg={webformatURL} largeImage={largeImageURL} />
          )
        })}
        </ul>
    )
  }

ImageGallery.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    })
  )
};

export default ImageGallery;

