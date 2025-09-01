import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const showModal = (message, type = 'success') => {
    setModal({ isOpen: true, message, type });
    setTimeout(() => {
      setModal({ isOpen: false, message: '', type: '' });
    }, 3000);
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: '', type: '' });
  };

  return (
    <ModalContext.Provider value={{ modal, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
