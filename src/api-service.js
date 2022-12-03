import axios from 'axios';

export default class ApiService {
    
    constructor() {
        this.searchValue = '';
        this.page = 1;
        this.totalImagesAmount = 0;
    }

    async fetchImages() {
    try {
        const BASE_URL = "https://pixabay.com/api";
        const API_KEY = "31702258-55b0df7955188e2c1c841f235";
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`); 
        const data = response.data;
    return data;
    } catch (err) {
 console.log(err);
 return;
    }  
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchValue;
    };

    set query(newQuery) {
        this.searchValue = newQuery;
    }

}