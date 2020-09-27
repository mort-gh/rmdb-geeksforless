import { combineReducers } from 'redux';
import { search } from '../shared/components/search/searchReducer';

export const rootReducer = combineReducers({ search });
