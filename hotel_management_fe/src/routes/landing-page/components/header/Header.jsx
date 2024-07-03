import Nav from '../nav/Nav';
import ArrowDownIcon from 'assests/icons/arrow-down-icon.svg';
import { useState } from 'react';

const navItem = [
  {
    id: 1,
    title: 'Trang Chủ',
  },
  {
    id: 2,
    title: 'Phòng & Suites',
  },
  {
    id: 3,
    title: 'Tiện Ích',
  },
];

const menuItem = [
  {
    id: 1,
    title: 'Khám phá',
  },
  {
    id: 2,
    title: 'Nhà Hàng',
  },
  {
    id: 3,
    title: 'Phòng họp & Sự kiện',
  },
  {
    id: 4,
    title: 'Ưu đãi',
  },
  {
    id: 5,
    title: 'Thư viện ảnh',
  },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpenMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 bg-white z-20">
      <img
        src="https://vi.marriottdanang.com/resourcefiles/sitelogoimage/hotel-logo-2.png?version=5292024040630"
        alt=""
      />
      <div className="flex w-[100%] bg-[#f0f1f0] relative">
        <div className="flex items-center gap-5 p-4">
          {navItem.map((item) => (
            <Nav key={item.id} title={item.title}>
              {item.title}
            </Nav>
          ))}
        </div>
        <div
          className="p-3 bg-white absolute right-1 top-1 cursor-pointer"
          onClick={handleOpenMenu}
        >
          <img
            className={open ? 'rotate-180' : ''}
            src={ArrowDownIcon}
            alt=""
          ></img>
        </div>
        {open && (
          <ul className="p-3 absolute right-0 top-[55px] cursor-pointer bg-[#f0f1f0] flex flex-col gap-2 z-10">
            {menuItem.map((item) => (
              <li className="px-2 py-1 hover:bg-slate-300">{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
