import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer } from 'redux-persist';
import counterReducer from './slices/counterSlice'; // Import the counter slice's reducer
import linkReducer from './slices/linkSlice'; // Import the link slice's reducer

// Redux Persist configuration for the counter slice
const counterPersistConfig = {
  key: 'counter',
  storage,
  whitelist: ['value'], // Optional: Persist only specific parts of the state if necessary
};

// Redux Persist configuration for the link slice
const linkPersistConfig = {
  key: 'links',
  storage,
  whitelist: ['links'], // Optional: Persist only the 'links' state (omit if you want the entire slice)
};

// Create persisted reducers for both slices
const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedLinkReducer = persistReducer(linkPersistConfig, linkReducer);

// Combine reducers
const rootReducer = combineReducers({
  counter: persistedCounterReducer,
  links: persistedLinkReducer, // Adding persisted linkSlice
});

export default rootReducer;
