export const MENU_LIST = 'MENU_LIST';
export const USER_INFO = 'USER_INFO';
export const COMMON_LIST = 'COMMON_LIST';

export const BP_LIST = 'BP_LIST';
export const ITEM_LIST = 'ITEM_LIST';
export const STORAGE_LIST = 'STORAGE_LIST';
export const USER_AUTH_LIST = 'USER_AUTH_LIST';
export const USER_LIST = 'USER_LIST';
export const LOCATION_LIST = 'LOCATION_LIST';
export const BP_SHIP_TO_LIST = 'BP_SHIP_TO_LIST';
export const DASHBOARD_LIST = 'DASHBOARD_LIST';

export const menuList = (menuList) => ({
  type: MENU_LIST,
  payload: menuList,
});

export const userInfo = (userInfo) => ({
  type: USER_INFO,
  payload: userInfo,
});

export const commonList = (commonList) => ({
  type: COMMON_LIST,
  payload: commonList,
});

export const bpList = (bpList) => ({
  type: BP_LIST,
  payload: bpList,
});

export const itemList = (itemList) => ({
  type: ITEM_LIST,
  payload: itemList,
});
export const storageList = (storageList) => ({
  type: STORAGE_LIST,
  payload: storageList,
});
export const userAuthList = (userAuthList) => ({
  type: USER_AUTH_LIST,
  payload: userAuthList,
});
export const userList = (userList) => ({
  type: USER_LIST,
  payload: userList,
});
export const locationList = (locationList) => ({
  type: LOCATION_LIST,
  payload: locationList,
});
export const bpShiptoList = (bpShiptoList) => ({
  type: BP_SHIP_TO_LIST,
  payload: bpShiptoList,
});

export const dashboardList = (dashboardList) => ({
  type: DASHBOARD_LIST,
  payload: dashboardList,
});
