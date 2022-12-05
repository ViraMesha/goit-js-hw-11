import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './api-service';

    
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
const newsApiService = new ApiService();
const simpleLightBox = new SimpleLightbox('.photo-card a');


form.addEventListener('submit', onSearch);
button.addEventListener('click', onLoadMoreBtn)

button.classList.add('is-hidden');



function onSearch(event) {
  event.preventDefault();
  newsApiService.searchValue = event.currentTarget.elements.searchQuery.value;
  
  if (!newsApiService.searchValue) {
        Notiflix.Notify.warning("The text field is empty. Please type something into it and retry.");
        return;
  };
  newsApiService.resetPage();
  newsApiService.fetchImages().then(data => {
    console.log(data)
    if (!data.hits.length) {
      gallery.innerHTML = '';
      button.classList.add('is-hidden');
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };

     if (data.hits.length >= 40) {
      button.classList.remove('is-hidden');
    };
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    simpleLightBox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${[data.totalHits]} images.`);

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * -200,
  behavior: "smooth",
});
    }); 
}

function createMarkup(arr) {
    return arr.map(({ largeImageURL, tags, webformatURL, likes, views, comments, downloads }) => `<div class="photo-card">
         <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`).join('');
}


function onLoadMoreBtn() {
  newsApiService.incrementPage()
  newsApiService.fetchImages().then(data => {
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
   newsApiService.totalImagesAmount += 40
   if (newsApiService.totalImagesAmount >= data.totalHits) {
     button.classList.add('is-hidden');
     Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
     return
    }
  });
}






