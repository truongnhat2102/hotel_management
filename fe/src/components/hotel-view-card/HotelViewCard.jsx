import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/price-helpers';


const HotelViewCard = (props) => {
  const {
    id: hotelCode,
    image,
    title,
    subtitle,
    benefits,
    price,
    ratings,
  } = props;
  const navigate = useNavigate();
  const onBookNowClick = () => {
    navigate(`/hotel/${hotelCode}`);
  };

  return (
    <div
      className="card border p-4 flex flex-col md:flex-row gap-x-2 w-full"
      data-testid="hotel-view-card"
    >
      <div className="cursor-pointer">
        <Link
          to={`/hotel/${hotelCode}`}
          className="block text-slate-700 hover:text-brand transition-colors duration-300"
        >
          <img
            src={image}
            alt={image.accessibleText}
            className="md:w-[220px] md:h-[140px]"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between ml-0 md:ml-2 flex-1">
        <div>
          <Link
            to={`/hotel/${hotelCode}`}
            className="block text-slate-700 hover:text-brand transition-colors duration-300"
          >
            <h4 className="text-2xl font-bold text-slate-600">{title}</h4>
          </Link>
          <p className="text-slate-600 text-sm">{subtitle}</p>
        </div>
        <ul>
          {/* {benefits.length > 0 &&
            benefits.map((benefit, index) => (
              <li className="text-green-800 font-medium text-sm" key={index}>
                <FontAwesomeIcon icon={faCheck} /> {benefit}
              </li>
            ))} */}
            <li className="text-green-800 font-medium text-sm" >
                <FontAwesomeIcon icon={faCheck} /> {benefits}
              </li>
        </ul>
      </div>
      <div className="flex flex-col ml-0 md:ml-auto justify-between border-l-0 md:border-l-2 items-stretch pl-0 md:pl-4">
        <div className="flex justify-between my-3 md:my-0 items-center md:flex-col md:justify-between w-full h-full">
          <h4 className="font-medium text-sm text-white bg-brand p-2">
            {ratings[0].feedback_vote} <FontAwesomeIcon icon={faStar} />
          </h4>
          <p className="text-slate-600 font-bold whitespace-nowrap">
            {formatPrice(price)} ₫
          </p>
        </div>
        <button
          className=" bg-brand-secondary px-4 py-2 text-white whitespace-nowrap"
          onClick={onBookNowClick}
        >
          Book now
        </button>
      </div>
    </div>
  );
};

export default HotelViewCard;
