import { Link, useNavigate, useLocation } from 'react-router-dom';
import DropdownButton from '../../components/ux/dropdown-button/DropdownButton';
import { useEffect } from 'react';

const NavbarItems = ({ isAuthenticated, onHamburgerMenuToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const context = useContext(AuthContext);
  let dataUser = sessionStorage.getItem("user") || null;

  const handleLogout = async () => {
    sessionStorage.removeItem("user");
    dataUser = null;
    navigate('/login');
  };

  const dropdownOptions = [
    { name: 'Profile', onClick: () => navigate('/user-profile') },
    { name: 'Logout', onClick: handleLogout },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/') && 'active-link'
            }`}
          onClick={onHamburgerMenuToggle}
        >
          Home
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/hotels"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/hotels') && 'active-link'
            }`}
          onClick={onHamburgerMenuToggle}
        >
          Rooms
        </Link>
      </li>
      <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
        <Link
          to="/about-us"
          className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/about-us') && 'active-link'
            }`}
          onClick={onHamburgerMenuToggle}
        >
          About us
        </Link>
      </li>
      {dataUser?.role_user == 'ROLE_ADMIN' ? (
        <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
          <Link
            to="/admin"
            className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/admin') && 'active-link'
              }`}
            onClick={onHamburgerMenuToggle}
          >
            Admin
          </Link>
        </li>
      ) : (
        <></>
      )}
      {dataUser?.role_user == 'ROLE_EMPLOYEE' ? (
        <li className="p-4 hover:bg-blue-900 md:hover:bg-brand">
          <Link
            to="/admin"
            className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/admin') && 'active-link'
              }`}
            onClick={onHamburgerMenuToggle}
          >
            Employee Page
          </Link>
        </li>
      ) : (
        <></>
      )}
      <li className='p-4 hover:bg-blue-900 md:hover:bg-brand'
      >
        {dataUser != null ? (
          <DropdownButton triggerType="click" options={dropdownOptions} />
        ) : (
          <Link
            to="/login"
            className={`uppercase font-medium text-slate-100 hover-underline-animation ${isActive('/login') && 'active-link'
              }`}
            onClick={onHamburgerMenuToggle}
          >
            Login/Register
          </Link>
        )}
      </li>
    </>
  );
};

export default NavbarItems;
