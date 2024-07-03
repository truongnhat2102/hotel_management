import React, { useState } from 'react';
import { Gallery } from 'react-grid-gallery';
import { imagesGallery } from 'utils/mock-data';
import './GalleryImage.css';
const GalleryImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleClick = (index) => {
    console.log(123132);
    setCurrentImage(imagesGallery[index].src);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <div>
      <Gallery
        images={imagesGallery}
        enableImageSelection={false}
        onClick={handleClick}
      />
      {isOpen && (
        <div className="lightbox" onClick={handleClose}>
          <span className="lightbox-close" onClick={handleClose}>
            &times;
          </span>
          <img src={currentImage} alt="" />
        </div>
      )}
    </div>
  );
};

export default GalleryImage;
