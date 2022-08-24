import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ handleLoadMore }) {
  return (
    <button type="button" className={s.button} onClick={handleLoadMore}>
      Load More
    </button>
  );
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
