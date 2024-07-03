import Footer from 'routes/landing-page/components/footer/Footer';
import Header from 'routes/landing-page/components/header/Header';

const { Fragment } = require('react');
const { Outlet } = require('react-router-dom');

const LandingPageLayout = () => {
  return (
    <Fragment>
      <div className="w-full">
        <Header />
        <Outlet />
        <Footer />
        <button className="w-full fixed bottom-0 p-4 bg-[#51555A] text-white z-20">
          Đặt Phòng
        </button>
      </div>
    </Fragment>
  );
};

export default LandingPageLayout;
