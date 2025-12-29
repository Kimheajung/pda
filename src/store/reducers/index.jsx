import { combineReducers } from 'redux';
import {
  MENU_LIST,
  USER_INFO,
  COMMON_LIST,
  BP_LIST,
  ITEM_LIST,
  STORAGE_LIST,
  USER_AUTH_LIST,
  USER_LIST,
  LOCATION_LIST,
  BP_SHIP_TO_LIST,
  DASHBOARD_LIST,
} from '../action/index';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const menuListState = {
  menuList: [],
};

const userInfoState = {
  userInfo: [],
};

const commonListState = {
  commonList: [],
};

const bpListState = {
  bpList: [],
};
const itemListState = {
  itemList: [],
};
const storageListState = {
  storageList: [],
};
const userAuthListState = {
  userAuthList: [],
};
const userListState = {
  userList: [],
};
const locationListState = {
  locationList: [],
};
const bpShiptoListState = {
  bpShiptoList: [],
};

const dashboardListState = {
  dashboardList: {},
};

const dashboardListReducer = (state = dashboardListState, action) => {
  switch (action.type) {
    case DASHBOARD_LIST:
      return action.payload;
    default:
      return state;
  }
};

const menuListReducer = (state = menuListState, action) => {
  switch (action.type) {
    case MENU_LIST:
      return action.payload;
    default:
      return state;
  }
};

const userInfoReducer = (state = userInfoState, action) => {
  switch (action.type) {
    case USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

const commonListReducer = (state = commonListState, action) => {
  switch (action.type) {
    case COMMON_LIST:
      return action.payload;
    default:
      return state;
  }
};

const bpListReducer = (state = bpListState, action) => {
  switch (action.type) {
    case BP_LIST:
      return action.payload;
    default:
      return state;
  }
};

const itemListReducer = (state = itemListState, action) => {
  switch (action.type) {
    case ITEM_LIST:
      return action.payload;
    default:
      return state;
  }
};

const storageListReducer = (state = storageListState, action) => {
  switch (action.type) {
    case STORAGE_LIST:
      return action.payload;
    default:
      return state;
  }
};
const userAuthListReducer = (state = userAuthListState, action) => {
  switch (action.type) {
    case USER_AUTH_LIST:
      return action.payload;
    default:
      return state;
  }
};
const userListReducer = (state = userListState, action) => {
  switch (action.type) {
    case USER_LIST:
      return action.payload;
    default:
      return state;
  }
};
const locationListReducer = (state = locationListState, action) => {
  switch (action.type) {
    case LOCATION_LIST:
      return action.payload;
    default:
      return state;
  }
};
const bpShiptoListReducer = (state = bpShiptoListState, action) => {
  switch (action.type) {
    case BP_SHIP_TO_LIST:
      return action.payload;
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'menuList',
    'userInfo',
    'commonList',
    'bpList',
    'itemList',
    'storageList',
    'userAuthList',
    'userList',
    'locationList',
    'bpShiptoList',
    'dashboardList',
  ],
};

const rootReducer = combineReducers({
  menuList: menuListReducer,
  userInfo: userInfoReducer,
  commonList: commonListReducer,
  bpList: bpListReducer,
  itemList: itemListReducer,
  storageList: storageListReducer,
  userAuthList: userAuthListReducer,
  userList: userListReducer,
  locationList: locationListReducer,
  bpShiptoList: bpShiptoListReducer,
  dashboardList: dashboardListReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer; 
