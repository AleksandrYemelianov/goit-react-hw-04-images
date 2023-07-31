import React, { useEffect } from 'react';
import {createPortal} from 'react-dom'

import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root-modal')


export default function Modal({ onCloseModal, src, alt }) {

    useEffect(() => {
        window.addEventListener('keydown', handleCloseModal);
    
        return () => {
            window.removeEventListener('keydown', handleCloseModal);
        }
    });
    
    
    const handleCloseModal = (e) => {
        if (e.currentTarget === e.target || e.code === 'Escape') {
            onCloseModal()
        }
    };

    return createPortal(
        <div onClick={handleCloseModal} className={css.overlay}>
            <div className={css.modal}>
                <img src={src} alt={alt} />
            </div>
        </div>,
        modalRoot,
    );
}

Modal.propTypes = {
    onCloseModal: PropTypes.func,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};
   

