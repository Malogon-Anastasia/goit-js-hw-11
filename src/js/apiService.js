const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24289866-51b1e94527fc028e7a5a15e50';
import axios from 'axios';


export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        try {
            const images = await axios.get( `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            this.page += 1;
            return images;
  } catch (error) {
    console.log(error);
  }
}
  
    get query() {
      return this.searchQuery;
  }

  set query(newQuery){
      this.searchQuery = newQuery;
  }

  incrementPage() {
      this.page +=1;
  }

  resetPage() {
      this.page = 1;
  }
};

