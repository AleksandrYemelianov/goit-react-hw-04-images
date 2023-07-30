import React, { Component } from 'react';
import {createPortal} from 'react-dom'

import PropTypes from 'prop-types';
import css from './Modal.module.css';


const modalRoot = document.querySelector('#root-modal')

export default class Modal extends Component {
    static propTypes = {
        onCloseModal: PropTypes.func,
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleCloseModal)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleCloseModal)
    }

    handleCloseModal = (e) => {
        if (e.currentTarget === e.target || e.code === 'Escape') {
            this.props.onCloseModal()
        }
    }

    render() {
        const {src, alt} = this.props
        return createPortal(
            <div onClick={this.handleCloseModal} className={css.overlay}>
                <div className={css.modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>,
            modalRoot,
        )
    }
}
