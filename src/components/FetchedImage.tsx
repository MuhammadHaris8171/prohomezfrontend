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
        <div className="position-relative" style={{ width: '44svw',height: '80svh', marginBottom: "5%", marginTop: "0.5%" }}>
            {/* Image Slider */}
            <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                // pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
                className={`${styles.gallerySlider}`}
                style={{ width: '100%', height: '100%' }}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index} className={`${styles.slide}`}>
                        <img 
                            src={`${imageBaseUrl}/images/${item}`} 
                            alt="ProHomez" 
                            className={`${styles.slideImg}`} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails (Positioned Absolute Below) */}
            <div 
                className="d-flex justify-content-center position-absolute start-50 translate-middle-x"
                style={{
                    bottom: "-20%",
                    width: "100%",
                    gap: "1.5rem",
                }}
            >
                {images.map((item, index) => (
                    <div 
                        key={index} 
                        className={`${styles.thumbnail}`}
                        style={{
                            width: "50px", height: "50px", cursor: "pointer",
                            border: selectedIndex === index ? "2px solid blue" : "none",
                            filter: selectedIndex === index ? "none" : "blur(0.5px)",
                            transition: "filter 0.3s ease-in-out"
                        }}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img 
                            src={`${imageBaseUrl}/images/${item}`} 
                            alt="ProHomez" 
                            className="w-100 h-100" 
                            style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchedImage;
