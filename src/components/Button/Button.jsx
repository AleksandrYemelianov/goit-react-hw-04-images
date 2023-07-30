import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({handleLoadMore}) => {
    return (
        <button onClick={() => handleLoadMore()} type='button' className={css.btn}>Load more</button>
    )
}

Button.propTypes = {
    handleLoadMore: PropTypes.func.isRequired,
}

export default Button;