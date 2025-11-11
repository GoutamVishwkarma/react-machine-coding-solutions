import { useState, useReducer, useRef, useEffect } from "react";

const Modal = ({ children, isOpen, close }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleClose);
    return () => {
      window.removeEventListener("keydown", handleClose);
    };
  }, [isOpen, close]);

  return (
    <div className="modal-wrapper">
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-expanded="true"
      >
        {children}
      </div>
    </div>
  );
};

const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <button tabindex="0" onClick={handleOpen}>
        Open
      </button>
      <Modal className="modal-container" isOpen={showModal} close={handleClose}>
        <h3>Modal heading</h3>
        <button onClick={handleClose}>Close</button>
      </Modal>
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <h3 id="heading">Interview</h3>
      <ModalComponent />
    </div>
  );
}
