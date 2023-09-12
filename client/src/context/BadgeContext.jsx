import { createContext, useContext, useState } from "react";

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [badgeCount, setBadgeCount] = useState(0);

  const updateBadgeCount = (newCount) => {
    setBadgeCount(newCount);
  };

  return (
    <BadgeContext.Provider value={{ badgeCount, updateBadgeCount }}>
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadge = () => {
  return useContext(BadgeContext);
};
