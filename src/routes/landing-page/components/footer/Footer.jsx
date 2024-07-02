import FacebookIcon from 'assests/icons/facebook-icon.svg';
import InstagramIcon from 'assests/icons/instagram-icon.svg';
const Footer = () => {
  return (
    <div className="bg-[#d3d8d3] py-[30px] flex flex-col items-center pb-[66px] overflow-hidden">
      <div className="flex items-center justify-center gap-4">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Privacy Policy</a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">Website Accessibility</a>
      </div>
      <div className="h-0.5 bg-black w-[100px] mt-5"></div>
      <h1 className="mb-5">Danang Marriott Resort & Spa</h1>
      <p>7 Truong Sa, Ngu Hanh Son District,Da Nang, 550000</p>
      <p>Phone: +84 23-6396 8888</p>
      <p className="text-center break-words whitespace-normal">
        Email: Danang Marriott Resort & Spa -
        <a href="mailto:danang.reservations@marriott.comdanang.reservations@marriott.com">
          danang.reservations@marriott.comdanang.reservations@marriott.com
        </a>
      </p>
      <div className="flex items-center gap-4 mt-5">
        <img className="w-[30px]" src={FacebookIcon} alt="" />
        <img className="w-[30px]" src={InstagramIcon} alt="" />
      </div>
    </div>
  );
};

export default Footer;
