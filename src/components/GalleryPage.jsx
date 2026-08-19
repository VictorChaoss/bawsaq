import React, { useState } from 'react';
import './GalleryPage.css';
import { GALLERY_IMAGES } from '../data/galleryImages';

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <h1 className="gallery-title">Marketing Assets</h1>
        <p className="gallery-subtitle">
          Official BAWSAQ environmental shots, POV teasers, and ecosystem branding.
        </p>
      </div>

      <div className="gallery-grid">
        {GALLERY_IMAGES.map((filename) => (
          <div 
            key={filename} 
            className="gallery-item"
            onClick={() => setSelectedImg(filename)}
          >
            <img src={`/gallery/${filename}`} alt={filename} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImg && (
        <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImg(null)}>&times;</button>
            <img src={`/gallery/${selectedImg}`} alt="Full screen" />
            <div className="lightbox-filename">{selectedImg}</div>
          </div>
        </div>
      )}
    </div>
  );
}
