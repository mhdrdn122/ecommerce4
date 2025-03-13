import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Menu } from '../../../Context/MenuContext';
import { WindoeWidth } from '../../../Context/WindoeContext';

const Categorise = () => {

  const menu = useContext(Menu);
  const windoeSize = useContext(WindoeWidth);
  let countCoursel = 2
  if(windoeSize.widthSize > 750){
    countCoursel= 4
  }
  else if(windoeSize.widthSize < 568){
    countCoursel= 1
  }
  else{
    countCoursel= 2
  }
  return (

    <section className="py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Category</h2>
              <div className="d-flex align-items-center">
                <a href="#" className="btn-link text-decoration-none">View All Categories →</a>
                <div className="swiper-buttons">
                  <button className="swiper-prev category-carousel-prev btn btn-yellow">❮</button>
                  <button className="swiper-next category-carousel-next btn btn-yellow">❯</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 ">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20} // المسافة بين السلايدات
              slidesPerView={countCoursel } // عدد السلايدات الظاهرة
              navigation={{
                nextEl: '.category-carousel-next',
                prevEl: '.category-carousel-prev',
              }}
              loop={false}
              className='flex-wrap'
            >
                
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-vegetables-broccoli.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-bread-baguette.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">Breads & Sweets</h3>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-soft-drinks-bottle.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">Soft Drinks</h3>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-wine-glass-bottle.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">drinks</h3>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-animal-products-drumsticks.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">Meat & Poultry</h3>
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className=" h-100 category-item">
                  <img
                    src={require("../images/icon-bread-herb-flour.png")}
                    alt="Category Thumbnail"
                  />
                  <h3 className="category-title">Herbs & Flour</h3>
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorise;
