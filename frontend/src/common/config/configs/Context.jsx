/* eslint-disable default-case */

import { useState, createContext, useCallback} from "react";

export const Context = createContext();
const currentYear = new Date().getFullYear();

export const ContextProvider = ({ children }) => {
  const [isActive, setActive] = useState("");
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);


  const [filterYear, setFilterYear] = useState(currentYear);
  const [filters, setFilters] = useState({
    session:"all",
    bar: "mensuel",
    nombreSession: "journalier",
    energyDelivery: "journalier",
    revenu: "journalier",
    newClient: "journalier",
  });

  // userRole;
  const handleFilterChange = useCallback((filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  }, []);

  const handleFilterYear = useCallback((filterValue) => {
    setFilterYear(filterValue);
  }, []);

  return (
    <Context.Provider
      value={{
        isActive,
        setActive,
        openNav,
        closeNav,
        nav,
        filterYear,
        handleFilterYear,
        filters,
        handleFilterChange,
      }}
    >
      {children}
    </Context.Provider>
  );
};
