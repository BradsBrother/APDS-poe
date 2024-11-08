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
        <>
          <div className="modalboxies" style={{ width: '400px', minHeight: '300px' }}>
            {showLoader ? (
              <div className="loader-container">
                <div className="loader">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
                <h4 className="loader-text">Processing Payment...</h4>
              </div>
            ) : (
              <div className="moo-dengbox">
                <div className={`closemoodeng ${showLoader ? 'hidden' : ''}`} onClick={closeModal}>
                  <CgClose size={35} />
                </div>
                <img src={bf} alt="moodeng" />
                <h3>Confirm <a href="https://images.lifestyleasia.com/wp-content/uploads/sites/2/2024/09/19170005/459118063_539597145247047_8853740358288590339_n.jpeg">MooDenggg</a></h3>
                <p>The Payment has successfully been verified!</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ModalComponent;