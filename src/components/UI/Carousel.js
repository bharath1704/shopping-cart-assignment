import { useEffect, useState } from 'react';
import './Carousel.scss';

import { fromByteArray } from 'ipaddr.js';

const Carousel = ({ data }) => {
  const banners = data.filter(b => b.isActive).sort((x, y) => x.order - y.order);
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselDisplay = () => {
    if (activeIndex === banners.length - 1) {
      return setActiveIndex(0);
    }
    return setActiveIndex(activeIndex + 1);
  }

  const updateIndex = (index) => {
    if (index < 0) {
      return setActiveIndex(banners.length - 1);
    }
    else if (index > banners.length - 1) {
      return setActiveIndex(0);
    }
    return setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => { carouselDisplay() }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className='carousel-container'>
      {banners.map(banner => {
        return (
          <div
            key={banner.id}
            className='carousel-item'
            style={{ transform: `translate(-${activeIndex * 100}%)` }}>
            <img
              src={banner.bannerImageUrl}
              alt={banner.bannerImageAlt}
              key={banner.id}
            />
          </div>
        )
      })}
      <button className="cr-btn cr-btn--prev" aria-label="previous" onClick={() => { updateIndex(activeIndex - 1) }}>
        PREV
      </button>
      <button className="cr-btn cr-btn--next" onClick={() => { updateIndex(activeIndex + 1) }}>
        NEXT
      </button>
      <div className="dots">
        {banners.map((banner, index) => {
          return (
            <button
              className={`dot ${activeIndex === index ? 'dot--fill' : ''}`}
              key={banner.id}
              aria-label={banner.bannerImageAlt}
              onClick={() => { updateIndex(index) }}>
              &nbsp;
            </button>)
        })}
      </div>
    </div>
  )
};

export default Carousel;