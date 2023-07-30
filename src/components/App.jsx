import React, { Component } from 'react'
import { getApi } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import optionNotification from 'components/Notification/Notification'
import Modal from 'components/Modal/Modal'

export default class App extends Component {
  state = {
    findText: '',
    page: 1,
    images: [],
    isLoad: false,
    isActiveButton: false,
    error: '',
    showModal: false,
    largeImages: '',
    tags: ''
  }
  
  componentDidUpdate(_, prevState) { 
    const { findText, page, error} = this.state;
    if (error) {
      return toast.error('An error occurred. Please try again later.', optionNotification)
    }

    if (prevState.findText !== findText || prevState.page !== page) {
      this.setState({ isLoad: true })
      this.getDataFromApi(findText, page);
    }
    if (prevState.findText !== findText) {
      this.setState({
        images: [],
        isActiveButton: false
      })
    }
  } 

  getDataFromApi = async (findText, page) => {
    try {
      const response = await getApi(findText, page);
      if (!response.ok) {
        throw new Error ()
      }
      const data = await response.json()

      if (data.hits.length === 0) {
        this.setState({
          isActiveButton: false,
        })
        toast.info('Please enter the correct request.', optionNotification);
        return
      } 
      this.setState(prev => ({
          images: [...prev.images, ...data.hits],
          isActiveButton: true,
        }))
      
       if (page >= Math.ceil(data.totalHits / 12 )) {
        this.setState({
          isActiveButton: false,
        })
        toast.info('This was the last page with great pictures.', optionNotification)
        return
      }
    }
    catch (error) {
      this.setState({
      error,
    }) }
    finally {this.setState({ isLoad: false })}
  }

  handleFind = (value) => {
    if (value === '') {
      this.setState({
        images: [],
        isActiveButton:false,
      })
     return toast.warn('Please enter for example, "cat", "bicycle", etc.', optionNotification)
    }
    this.setState({
      findText: value,
      page: 1,
    })
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}))
  }

  toggleModal = (largeImages, tags) => {
    this.setState(prev => ({
      showModal: !prev.showModal,
      largeImages,
      tags,
    }))
  }
  render() {
    
    const { images, isLoad, isActiveButton, showModal, largeImages, tags } = this.state;
    const { handleFind, handleLoadMore, toggleModal } = this;
    return (
      <div>
        <Searchbar handleFind={handleFind} />
        {isLoad && <Loader/>}
        <ImageGallery images={images} onOpenModal={toggleModal} />
        {isActiveButton && <Button handleLoadMore={handleLoadMore} />}
        <ToastContainer />
        {showModal && <Modal src={largeImages} tags={tags} onCloseModal={toggleModal} />}
      </div>
    )
  }
}

