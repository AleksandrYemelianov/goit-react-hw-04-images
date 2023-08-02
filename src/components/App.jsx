import React, { useReducer, useEffect } from 'react'
import { getApi } from '../service/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'
import optionNotification from 'components/Notification/Notification'
import Modal from 'components/Modal/Modal'

const initialState = {
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'findText':
      return { ...state, findText: action.payload };
    case 'page':
      return { ...state, page: action.payload };
    case 'images':
      return { ...state, images: [...state.images, ...action.payload] };
    case 'isLoad':
      return { ...state, isLoad: action.payload };
    case 'isActiveButton':
      return { ...state, isActiveButton: action.payload };
    case 'error':
      return { ...state, error: action.payload };
    case 'showModal':
      return { ...state, showModal: action.payload };
    case 'largeImages':
      return { ...state, largeImages: action.payload };
      case 'tags':
        return { ...state, tags: action.payload };
        
        default:
          return state;
        }
      }
      
      export default function App() {
        const [state, dispatch] = useReducer(reducer, initialState);
        // const [images, setImages] = useState([])
        console.log(state.images);
        useEffect(() => {
          if (state.findText === '') {
            return
          };
          async function getDataFromApi() {
            dispatch({ type: 'isLoad', payload: true });
            
      try {
        const response = await getApi(state.findText, state.page);
        if (!response.ok) {
          throw new Error()
        }
        const data = await response.json()
        
        if (data.hits.length === 0) {
          dispatch({ type: 'isActiveButton', payload: false });
          toast.info('Please enter the correct request.', optionNotification);
          return
        }
      console.log(data.hits)
      //  setImages(p=>[...p, ...data.hits])
      dispatch((prev) => {
        console.log(prev.images); 
        return { type: 'images', payload: [...prev.images, ...data.hits] }
      });
      dispatch({ type: 'isActiveButton', payload: true });
      
      if (state.page >= Math.ceil(data.totalHits / 12)) {
          dispatch({ type: 'isActiveButton', payload: false });
          toast.info('This was the last page with great pictures.', optionNotification);
          return
        };
      }
      catch (error) {
        dispatch({ type: 'error', payload: error })
        toast.error('An error occurred. Please try again later.', optionNotification);
      }
      finally {
        dispatch({ type: 'isLoad', payload: false })
      }
          }
          
          getDataFromApi();
  }, [state.findText, state.page]);

  const handleFind = (valueSearch) => {
    if (state.findText === valueSearch) {
      return 
    }
    dispatch({ type: 'findText', payload: valueSearch });
    dispatch({ type: 'page', payload: 1 }); 
    // setImages([])
    // dispatch({type: 'images', payload: []})
    dispatch({ type: 'isActiveButton', payload: false });

  };

  const toggleModal = (largeImg, tags) => {
    dispatch({type: 'showModal', payload: !state.showModal});
    dispatch({type: 'largeImages', payload: largeImg});
    dispatch({type: 'tags', payload: tags});
  };

  const handleLoadMore = () => {
    dispatch({ type: 'page', payload: state.page + 1 });
  };
 
  return (
     <div>
      <Searchbar handleFind={handleFind} />
      {state.isLoad && <Loader />}
      {state.images && <ImageGallery images={state.images} onOpenModal={toggleModal} />}
      {state.isActiveButton && <Button handleLoadMore={handleLoadMore} />}
      <ToastContainer />
      {state.showModal && <Modal src={state.largeImages} tags={state.tags} onCloseModal={toggleModal} />} 
    </div>
  )
}

