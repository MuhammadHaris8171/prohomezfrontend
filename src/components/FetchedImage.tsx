import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '../style/FetchedImage.module.css';

interface GalleryBoxProps {
    featureImage: string;
    images?: string[];
}

function FetchedImage({ featureImage, images = [] }: GalleryBoxProps) {
    const imageBaseUrl = import.meta.env.VITE_PROHOMEZ_BACKEND_URL;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    // Move main slider when clicking on a thumbnail
    const handleThumbnailClick = (index: number) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideToLoop(index);
            setSelectedIndex(index);
        }
    };

    return (
        <div className={`${styles.galleryContainer}`}>
            {/* Image Slider */}
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
                className={`${styles.gallerySlider}`}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index} className={`${styles.slide}`}>
                        <img 
                            src={`${imageBaseUrl}/images/${item}`} 
                            alt="ProHomez" 
                            className={`${styles.slideImg}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails */}
            <div className={`${styles.thumbnailContainer}`}>
                {images.map((item, index) => (
                    <div 
                        key={index} 
                        className={`${styles.thumbnail} ${selectedIndex === index ? styles.activeThumbnail : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img 
                            src={`${imageBaseUrl}/images/${item}`} 
                            alt="ProHomez" 
                            className={`${styles.thumbnailImg}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchedImage;
