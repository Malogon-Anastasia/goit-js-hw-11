import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import photoCardMarkup from '../templates/photo-card-markup.hbs';
import { fetchImages, pageReset } from "./apiService.js";
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../sass/main.scss';
// import axios from 'axios';
// const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');
const searchFormRef = document.querySelector('.search-form');
// const loadBtnRef = document.querySelector('.load-button');
const sentinelRef = document.querySelector('.sentinel');
let input = '';
    
searchFormRef.addEventListener('submit', imageInputHandler);

// const imageApiService = new ImageApiService;

//--------бесконечный скролл---------//
const observer = new IntersectionObserver(onEntry, {
    rootMargin: '100px',
  });
 

function imageInputHandler(event) {
    event.preventDefault();
    input = event.currentTarget.searchQuery.value;
    pageReset();
    // deleteMarkup();
        
    
    
    fetchImages(input)
    .then(images => {
      const imagesArray = images.data.hits;
      const totalHits = images.data.totalHits;

    //   if (imagesArray.length === ' ') {
    //     deleteMarkup();
    //     Notify.failure('Sorry, there are no images matching your search query. Please try again.');         
    //     // loadBtnRef.setAttribute('disabled', true);
    //     return;
    // }
      
      if (imagesArray.length === 0) {
            // deleteMarkup();
           return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            
        } else {
          deleteMarkup();
          createMarkup(photoCardMarkup, imagesArray);
          // loadBtnRef.removeAttribute('disabled');
          // loadBtnRef.addEventListener('click', onLoadMore);
          // galleryRef.addEventListener('click', onImgClick);
          Notify.success(`Hooray! We found ${totalHits} images.`);
          observer.observe(sentinelRef);
        }

        
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

    if (entry.isIntersecting && entries.searchQuery !== '') {
          fetchImages(input)
          .then(images => {
            const imagesArray = images.data.hits;
              createMarkup(photoCardMarkup, imagesArray);
              // galleryRef.addEventListener('click', onImgClick);
          })
          
      }
  })  
}