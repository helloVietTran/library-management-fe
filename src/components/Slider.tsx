import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SliderProps {
  data: any;
  SliderCard: React.ComponentType;
}

const Slider: React.FC = ({ data, SliderCard }) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swiperEl = document.querySelector('.swiper') as HTMLElement & {
      swiper: any;
    };
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.params.navigation.prevEl = prevRef.current;
      swiperEl.swiper.params.navigation.nextEl = nextRef.current;
      swiperEl.swiper.navigation.init();
      swiperEl.swiper.navigation.update();
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={prevRef}
        className="absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md transition-all hover:scale-105"
      >
        &lt;
      </div>
      <div
        ref={nextRef}
        className="absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-100 shadow-md transition-all hover:scale-105"
      >
        &gt;
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <SliderCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
