import axios from 'axios';

const API_KEY = `8b47da7b`;
axios.defaults.baseURL = `http://www.omdbapi.com/`;

export default {
  async getMovieByID(id) {
    try {
      const data = await axios.get(`?apikey=${API_KEY}&i=${id}&plot=full`);
      return data.data;
    } catch (error) {
      console.log('FETCH getMovieByID error', error);
      throw new Error(error);
    }
  },

  async getMovieByTitle(title) {
    try {
      const data = await axios.get(`?apikey=${API_KEY}&t=${title}&plot=full`);
      return data.data;
    } catch (error) {
      console.log('FETCH getMovieByTitle error', error);
      throw new Error(error);
    }
  },

  async getMoviesBySearchQuery(query, page = 1) {
    try {
      const data = await axios.get(
        `?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      return data.data;
    } catch (error) {
      console.log('FETCH getMovieBySearchQuery error', error);
      throw new Error(error);
    }
  },
};
