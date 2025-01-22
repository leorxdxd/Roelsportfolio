import React from "react";
import "../assets/styles/Gallery.scss";

const galleryImages = [
  { id: 1, src: require("../assets/images/ga1.JPG"), alt: "Image 1" },
  { id: 2, src: require("../assets/images/ga5.JPG"), alt: "Image 2" },
  { id: 3, src: require("../assets/images/ga3.JPG"), alt: "Image 3" },
  { id: 4, src: require("../assets/images/ga4.JPG"), alt: "Image 4" },
  { id: 5, src: require("../assets/images/ga2.JPG"), alt: "Image 5" },
  { id: 6, src: require("../assets/images/ga3.JPG"), alt: "Image 6" },
  { id: 7, src: require("../assets/images/ga6.JPG"), alt: "Image 7" },
  { id: 8, src: require("../assets/images/ga1.JPG"), alt: "Image 8" },
];

function Gallery() {
  return (
    <div className="gallery-container" id="gallery">
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-grid">
        {galleryImages.map((image) => (
          <div key={image.id} className="gallery-item">
            <img src={image.src} alt={image.alt} className="gallery-thumbnail" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
