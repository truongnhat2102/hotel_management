import { useState } from 'react';
import Carousel from 'routes/home/components/carousel/Carousel';
import ArrowRightIcon from 'assests/icons/arrow-right-icon.svg';
import { restaurantExample, roomExample, swiperExample } from 'utils/mock-data';
import ArrowDownIcon from 'assests/icons/arrow-down-icon.svg';
import GalleryImage from './components/gallery-images/GalleryImage';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const renderContentBoxForSection2 = (item) => (
    <div className="relative top-[-30px] bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
      <p className="mb-4">{item.description}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <span className="block text-sm">Diện tích</span>
          <span className="block text-lg font-bold">{item.area} m²</span>
        </div>
        <div className="text-center">
          <span className="block text-sm">Giường</span>
          <span className="block text-lg font-bold">
            {item.amountOfBed} Giường Lớn
          </span>
        </div>
        <div className="text-center">
          <span className="block text-sm">Sức chứa</span>
          <span className="block text-lg font-bold">{item.capacity}</span>
        </div>
      </div>
      <button className="bg-black text-white py-2 px-4 rounded">
        Đặt ngay
      </button>
    </div>
  );

  const renderContentBoxForSection4 = (item) => {
    return (
      <div
        className="relative top-[-30px] bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] bg-white p-4 shadow-md cursor-pointer "
        onClick={toggleAccordion}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <img
            className={isOpen ? 'rotate-180' : ''}
            src={ArrowDownIcon}
            alt=""
          />
        </div>

        {isOpen && (
          <div className="mt-4">
            <div className="flex flex-col mb-4 items-start">
              <p>{item.phone}</p>
              <p>{item.extension}</p>
              <p>Giá: {item.price}</p>
              <p>Ẩm thục: {item.food}</p>
              <p>Giờ hoạt động: {item.time}</p>
            </div>
            <button className="bg-black text-white py-2 px-4 rounded">
              Đặt ngay
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full text-center mt-[135px]">
      <Carousel data={swiperExample} />
      {/* Section 1 */}
      <div className="mt-4 my-10 mx-5 flex flex-col items-center gap-5">
        <h1 className="p-2 bg-[#D3D8D3] w-fit inline-block font-bold">
          Danang Marriott Resort & Spa
        </h1>
        <p className="font">Nghỉ dưỡng sang trọng bên bờ biển nhiệt đới</p>
        <img
          className="w-[50%] mx-auto mb-[30px]"
          src="https://vi.marriottdanang.com/resourcefiles/home-content-section-image/family-resort-in-danang.jpg?version=5292024040630"
          alt=""
        />
        <p className="text-start">
          <span className="font-bold">Danang Marriott Resort & Spa</span> là khu
          nghỉ dưỡng gần biển ở Đà Nẵng mang thương hiệu quốc tế Marriott
          International đầu tiên tại Việt Nam. Với 239 phòng và biệt thự, các
          villa 3 phòng ngủ và 4 phòng ngủ là những căn biệt thự có bể bơi riêng
          mang đến sự tiện nghi cho tất cả thành viên trong gia đình. Đặc biệt,
          khu nghỉ dưỡng bên bãi biển Non Nước luôn có những hoạt động thú vị
          dành riêng cho trẻ hướng tới là một trong những khu nghỉ dưỡng cho gia
          đình tốt nhất tại Đà Nẵng. Là một trong những resort gần biển ở Đà
          Nẵng, khu nghỉ dưỡng còn là địa điểm lý tưởng cho các cặp đôi tổ chức
          tiệc cưới trên bãi biển hay cùng nhau tận hưởng một kỳ nghỉ lãng mạn
          tại Đà Nẵng.
        </p>
        <div>
          <p className="text-start font-bold text-xl mt-5">
            Lợi ích khi đặt phòng trực tiếp
          </p>
          <ul className="flex flex-col gap-3 mt-3">
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Ưu đãi giá phòng</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Lễ tân 24 giờ</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Giảm giá thành viên Marriott Bonvoy</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Truy cập Internet miễn phí</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Dịch vụ giặt ủi</p>
            </li>
          </ul>
        </div>
      </div>
      {/* Section 2 */}
      <div className="pt-10 pb-[150px] bg-[#d3d8d3]">
        <div className="flex flex-col items-center gap-5 mb-5">
          <h1 className="p-2 bg-white w-fit inline-block font-bold">
            Phòng & Suites
          </h1>
          <p className="">Nơi Gặp Gỡ Giữa Các Nền Văn Hóa</p>
        </div>
        <Carousel
          data={roomExample}
          renderContent={renderContentBoxForSection2}
        />
      </div>
      {/* Section 3 */}
      <div className="relative mb-[200px] mt-10">
        <img
          className="w-[50%] mx-auto mb-[30px]"
          alt=""
          src="https://vi.marriottdanang.com/resourcefiles/hotelserviceright/cooking-class-at-marriott-danang.jpg?version=5292024040630"
        ></img>
        <div className="absolute  bottom-[-150px] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] bg-white p-8 shadow-md flex flex-col items-center gap-5">
          <h1 className="p-2 bg-[#D3D8D3] w-fit inline-block font-bold">
            DỊCH VỤ VÀ TIỆN ÍCH
          </h1>
          <ul className="flex flex-col  gap-3 mt-3">
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Ưu đãi giá phòng</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Lễ tân 24 giờ</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Giảm giá thành viên Marriott Bonvoy</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Truy cập Internet miễn phí</p>
            </li>
            <li className="flex items-center gap-3 font-semibold">
              <img src={ArrowRightIcon} alt="" />
              <p>Dịch vụ giặt ủi</p>
            </li>
          </ul>
        </div>
      </div>
      {/* Section 4 */}
      <div className="pt-10 pb-[50px] ">
        <div className="flex flex-col items-center gap-5 mb-5 mx-5 ">
          <h1 className="p-2 bg-[#d3d8d3] w-fit inline-block font-bold">
            NHÀ HÀNG & BAR
          </h1>
          <p className="">Hành trình trải nghiệm mỹ thực Á-Âu</p>
          <p className="text-start">
            Nghệ thuật ẩm thực được kết hợp đa dạng dưới bàn tay khéo léo của
            các đầu bếp tài ba. Từ những món ăn đặc trưng từ khắp nơi trên thế
            giới đến các đặc sản địa phương, hành trình trải nghiệm ẩm thực tại
            Danang Marriott Resort & Spa hứa hẹn sẽ mang đến cho mỗi thực khách
            những cung bậc cảm xúc đáng nhớ
          </p>
        </div>
        <button className="bg-black text-white py-2 px-4 rounded mb-5">
          Xem thêm thông tin
        </button>
        <Carousel
          data={restaurantExample}
          renderContent={renderContentBoxForSection4}
        />
      </div>
      {/* Section 5 */}
      <div className="pt-10">
        <div className="flex flex-col items-center gap-5 mb-5 mx-5 ">
          <h1 className="p-2 bg-[#d3d8d3] w-fit inline-block font-bold">
            HỘI NGHỊ VÀ PHÒNG HỌP
          </h1>
          <p className="">GRAND BALLROOM</p>
          <p className="text-start">
            Grand ballroom có sức chứa lên đến 500 khách theo phong cách nhà hát
            và 250 khách theo phong cách lớp học.
          </p>
        </div>
        <button className="bg-black text-white py-2 px-4 rounded mb-5">
          Xem thêm thông tin
        </button>
        <Carousel
          data={roomExample}
          renderContent={renderContentBoxForSection2}
        />
      </div>
      {/* Section 6 */}
      <div className="pt-10">
        <h1 className="p-2 bg-[#D3D8D3] w-fit inline-block font-bold mb-5">
          THƯ VIỆN ẢNH
        </h1>
        <div className="w-[80%] mx-auto p-3">
          <GalleryImage />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
