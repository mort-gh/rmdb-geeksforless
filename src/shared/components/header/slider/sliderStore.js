import slidesImgData from '../../../../bgdb.json';

export const initialState = {
  slides: slidesImgData,
  isLoaded: false,
  currentSlideIdx: 0,
  currentSlideData: null,
  error: null,
};
