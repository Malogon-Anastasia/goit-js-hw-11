const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '24289866-51b1e94527fc028e7a5a15e50';
import axios from 'axios';
export { fetchImages, pageReset };
let page = 1;

// export default class ImageApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

    async function fetchImages(searchQuery) {
        try {
            const images = await axios.get( `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
            page += 1;
            return images;
  } catch (error) {
    console.log(error);
  }
}

    function pageReset() {
        page = 1;
    }



