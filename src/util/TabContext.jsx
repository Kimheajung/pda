import React, { createContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
  const [activeKey, setActiveKey] = useState(null);
  const [tabData, setTabData] = useState({});

  const updateTabData = (key, data) => {
    setTabData((prevData) => ({ ...prevData, [key]: data }));
  };

  const getTabData = (key) => {
    return tabData[key] || {};
  };

  const removeTabData = (key) => {
    setTabData((prevData) => {
      const { [key]: _, ...rest } = prevData;
      return rest;
    });
  };

  const value = {
    activeKey,
    setActiveKey,
    tabData,
    updateTabData,
    getTabData,
    removeTabData,
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
}

