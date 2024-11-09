import React, { useState, useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

const ModalComponent = ({ isModalOpen, closeModal, bf }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modalboxies">
            {showLoader ? (
              <div className="loader-container">
                <div className="dot-spinner">
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                  <div className="dot-spinner__dot"></div>
                </div>
                <h4 className="loader-text">Processing Payment...</h4>
              </div>
            ) : (
              <div className="moo-dengbox">
                <div
                  className={`closemoodeng ${showLoader ? 'hidden' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => { 
                    closeModal();
                    window.location.reload(); 
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      closeModal();
                      window.location.reload();
                    }
                  }}
                  aria-label="Close modal"
                >

                  <CgClose size={35} />
                </div>
                <img src={bf} alt="moodeng" />
                <h3>Payment Sent<a href="https://images.lifestyleasia.com/wp-content/uploads/sites/2/2024/09/19170005/459118063_539597145247047_8853740358288590339_n.jpeg">!</a></h3>
                <p>The Payment has successfully been verified!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};  
export default ModalComponent;