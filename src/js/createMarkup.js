import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import photoCardMarkup from '../templates/photo-card-markup.hbs';
import ImageApiService from "./apiService.js";
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../sass/main.scss';
import axios from 'axios';
// const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
// const loadBtnRef = document.querySelector('.load-button');
const sentinelRef = document.querySelector('.sentinel');

    
searchFormRef.addEventListener('submit', imageInputHandler);

const imageApiService = new ImageApiService;

//--------бесконечный скролл---------//
const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
  });

  // let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  
  // function onImgClick(evt) {
  //   evt.preventDefault();
  //   lightbox.open('.gallery');
  // }
  

function imageInputHandler(event) {
    event.preventDefault();
    imageApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
    imageApiService.resetPage();
    deleteMarkup();
    
    
    if (imageApiService.searchQuery === '') {
        deleteMarkup();
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');         
        // loadBtnRef.setAttribute('disabled', true);
        return;
    }
    
    imageApiService.fetchImages()
    .then(images => {
        if(images.length === 0) {
            deleteMarkup();
            Notify.failure('No matches found. Please try again!');
            return;
        }

        createMarkup(photoCardMarkup, images);
        // loadBtnRef.removeAttribute('disabled');
        // loadBtnRef.addEventListener('click', onLoadMore);
        // galleryRef.addEventListener('click', onImgClick);
        observer.observe(sentinelRef);
    })

};


function createMarkup(markupCreationFunction, requestResult) {
  const markup = markupCreationFunction(requestResult);
  galleryRef.innerHTML += markup;
  const gallery = new SimpleLightbox('.gallery a', {showCounter: false});
    gallery.refresh();
}


function deleteMarkup() {
  galleryRef.innerHTML = '';
}

//---------функция реализации бесконечного скролла---------//

function onEntry(entries) {
  entries.forEach(entry => {

    if (entry.isIntersecting && imageApiService.searchQuery !== '') {
          imageApiService.fetchImages()
          .then(images => {
      
              createMarkup(photoCardMarkup, images);
              // galleryRef.addEventListener('click', onImgClick);

          })
          
      }
  })  
}
