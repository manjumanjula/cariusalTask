import React, { useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = () => {
    const [images] = useState([
        { id: 1, imageUrl: "/image6.png" },
        { id: 2, imageUrl: "/image2.png" },
        { id: 3, imageUrl: "/image3.png" },
        { id: 4, imageUrl: "/image4.png" },
        { id: 5, imageUrl: "/image5.png" }
    ]);

    const [activeIndex, setActiveIndex] = useState(0); // To track the clicked/enlarged image
    const [visibleIndex, setVisibleIndex] = useState(0); // Tracks the first image in the visible set of 3

    const handleImageClick = (index) => {
        setActiveIndex(index); // Set clicked image to enlarge
        // Move the carousel to the next set of images
        if (index === visibleIndex + 2) { // If clicked image is the third one in the current view
            setVisibleIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setVisibleIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Get the 3 images to display (with wrap-around behavior)
    const getVisibleImages = () => {
        const start = visibleIndex;
        const end = (visibleIndex + 3) % images.length;
        if (start < end) {
            return images.slice(start, end);
        }
        return [...images.slice(start), ...images.slice(0, end)];
    };

    return (
        <div className="carousel-wrapper">
            <h2>Carousel Rectangular Interaction</h2>
            <div className="carousel-container">
                <div className="arrow left-arrow" onClick={handlePrev}>&#8249;</div> {/* Left arrow */}

                <div className="carousel-images">
                    {getVisibleImages().map((image, index) => (
                        <div
                            key={image.id}
                            className={`image-card ${activeIndex === visibleIndex + index ? 'enlarged' : ''}`}
                            onClick={() => handleImageClick(visibleIndex + index)}
                        >
                            <img src={image.imageUrl} alt={`Image ${image.id}`} />
                        </div>
                    ))}
                </div>

                <div className="arrow right-arrow" onClick={handleNext}>&#8250;</div> {/* Right arrow */}
            </div>
        </div>
    );
};

export default ImageCarousel;
