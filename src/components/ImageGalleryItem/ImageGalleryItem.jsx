import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';


const ImageGalleryItem = ({alt, smallImg, onClick, largeImage}) => {
  return (
     <li className={css.item}>
      <img src={smallImg} alt={alt} className={css.itemImage} onClick={()=>onClick(largeImage, alt)} />
      </li>
    )
  }


ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
}

export default ImageGalleryItem;

