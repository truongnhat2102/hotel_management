import React, { useState, useEffect } from 'react';
import Toast from '../../../components/ux/toast/Toast';
import Select from 'react-select';


const ProfileDetailsPanel = ({ userDetails }) => {
  // states to manage the edit mode and user details
  const [isEditMode, setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [nationality, setNationality] = useState('');
  const [countries, setCountries] = useState([]);

  const [toastMessage, setToastMessage] = useState('');

  const clearToastMessage = () => {
    setToastMessage('');
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCancelClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async () => {
    // check if newstate is different from old state
    if (
      firstName === userDetails.firstName &&
      lastName === userDetails.lastName &&
      phoneNumber === userDetails.phone &&
      nationality === userDetails.country
    ) {
      setIsEditMode(false);
      return;
    }

    const updatedUserDetails = {
      user_fullname: firstName + ' ' + lastName,
      user_phoneNumber: phoneNumber,
      country: nationality,
      user_email: dateOfBirth
    };
    console.log(updatedUserDetails)
    // Call the API to update the user details
    const response = await fetch('http://localhost:8080/user/save', {
      method: 'POST',
      body: JSON.parse(updatedUserDetails)
    });

    if (response.ok) {
      setToastMessage({
        type: 'success',
        message: response.status,
      });
    } else {
      // revert to original state
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
      setPhoneNumber(userDetails.phone);
      setNationality(userDetails.country);
      setToastMessage({
        type: 'error',
        message: 'Oops, something went wrong. Please try again later.',
      });
    }

    setIsEditMode(false);
  };

  // effect to set initial state of user details
  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || '');
      setLastName(userDetails.lastName || '');
      setEmail(userDetails.email || '');
      setPhoneNumber(userDetails.phone || '');
      setNationality(userDetails.country || '');
      setIsEmailVerified(userDetails.isEmailVerified || '');
      setIsPhoneVerified(userDetails.isPhoneVerified || '');
      setDateOfBirth(userDetails.dateOfBirth || '');
    }
  }, [userDetails]);

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesData = [
        {
          "name": "Afghanistan",
          "code": "AF"
        },
        {
          "name": "Åland Islands",
          "code": "AX"
        },
        {
          "name": "Albania",
          "code": "AL"
        },
        {
          "name": "Algeria",
          "code": "DZ"
        },
        {
          "name": "American Samoa",
          "code": "AS"
        },
        {
          "name": "AndorrA",
          "code": "AD"
        },
        {
          "name": "Angola",
          "code": "AO"
        },
        {
          "name": "Anguilla",
          "code": "AI"
        },
        {
          "name": "Antarctica",
          "code": "AQ"
        },
        {
          "name": "Antigua and Barbuda",
          "code": "AG"
        },
        {
          "name": "Argentina",
          "code": "AR"
        },
        {
          "name": "Armenia",
          "code": "AM"
        },
        {
          "name": "Aruba",
          "code": "AW"
        },
        {
          "name": "Australia",
          "code": "AU"
        },
        {
          "name": "Austria",
          "code": "AT"
        },
        {
          "name": "Azerbaijan",
          "code": "AZ"
        },
        {
          "name": "Bahamas",
          "code": "BS"
        },
        {
          "name": "Bahrain",
          "code": "BH"
        },
        {
          "name": "Bangladesh",
          "code": "BD"
        },
        {
          "name": "Barbados",
          "code": "BB"
        },
        {
          "name": "Belarus",
          "code": "BY"
        },
        {
          "name": "Belgium",
          "code": "BE"
        },
        {
          "name": "Belize",
          "code": "BZ"
        },
        {
          "name": "Benin",
          "code": "BJ"
        },
        {
          "name": "Bermuda",
          "code": "BM"
        },
        {
          "name": "Bhutan",
          "code": "BT"
        },
        {
          "name": "Bolivia",
          "code": "BO"
        },
        {
          "name": "Bosnia and Herzegovina",
          "code": "BA"
        },
        {
          "name": "Botswana",
          "code": "BW"
        },
        {
          "name": "Bouvet Island",
          "code": "BV"
        },
        {
          "name": "Brazil",
          "code": "BR"
        },
        {
          "name": "British Indian Ocean Territory",
          "code": "IO"
        },
        {
          "name": "Brunei Darussalam",
          "code": "BN"
        },
        {
          "name": "Bulgaria",
          "code": "BG"
        },
        {
          "name": "Burkina Faso",
          "code": "BF"
        },
        {
          "name": "Burundi",
          "code": "BI"
        },
        {
          "name": "Cambodia",
          "code": "KH"
        },
        {
          "name": "Cameroon",
          "code": "CM"
        },
        {
          "name": "Canada",
          "code": "CA"
        },
        {
          "name": "Cape Verde",
          "code": "CV"
        },
        {
          "name": "Cayman Islands",
          "code": "KY"
        },
        {
          "name": "Central African Republic",
          "code": "CF"
        },
        {
          "name": "Chad",
          "code": "TD"
        },
        {
          "name": "Chile",
          "code": "CL"
        },
        {
          "name": "China",
          "code": "CN"
        },
        {
          "name": "Christmas Island",
          "code": "CX"
        },
        {
          "name": "Cocos (Keeling) Islands",
          "code": "CC"
        },
        {
          "name": "Colombia",
          "code": "CO"
        },
        {
          "name": "Comoros",
          "code": "KM"
        },
        {
          "name": "Congo",
          "code": "CG"
        },
        {
          "name": "Congo, The Democratic Republic of the",
          "code": "CD"
        },
        {
          "name": "Cook Islands",
          "code": "CK"
        },
        {
          "name": "Costa Rica",
          "code": "CR"
        },
        {
          "name": "Croatia",
          "code": "HR"
        },
        {
          "name": "Cuba",
          "code": "CU"
        },
        {
          "name": "Cyprus",
          "code": "CY"
        },
        {
          "name": "Czech Republic",
          "code": "CZ"
        },
        {
          "name": "Denmark",
          "code": "DK"
        },
        {
          "name": "Djibouti",
          "code": "DJ"
        },
        {
          "name": "Dominica",
          "code": "DM"
        },
        {
          "name": "Dominican Republic",
          "code": "DO"
        },
        {
          "name": "Ecuador",
          "code": "EC"
        },
        {
          "name": "Egypt",
          "code": "EG"
        },
        {
          "name": "El Salvador",
          "code": "SV"
        },
        {
          "name": "Equatorial Guinea",
          "code": "GQ"
        },
        {
          "name": "Eritrea",
          "code": "ER"
        },
        {
          "name": "Estonia",
          "code": "EE"
        },
        {
          "name": "Ethiopia",
          "code": "ET"
        },
        {
          "name": "Falkland Islands (Malvinas)",
          "code": "FK"
        },
        {
          "name": "Faroe Islands",
          "code": "FO"
        },
        {
          "name": "Fiji",
          "code": "FJ"
        },
        {
          "name": "Finland",
          "code": "FI"
        },
        {
          "name": "France",
          "code": "FR"
        },
        {
          "name": "French Guiana",
          "code": "GF"
        },
        {
          "name": "French Polynesia",
          "code": "PF"
        },
        {
          "name": "French Southern Territories",
          "code": "TF"
        },
        {
          "name": "Gabon",
          "code": "GA"
        },
        {
          "name": "Gambia",
          "code": "GM"
        },
        {
          "name": "Georgia",
          "code": "GE"
        },
        {
          "name": "Germany",
          "code": "DE"
        },
        {
          "name": "Ghana",
          "code": "GH"
        },
        {
          "name": "Gibraltar",
          "code": "GI"
        },
        {
          "name": "Greece",
          "code": "GR"
        },
        {
          "name": "Greenland",
          "code": "GL"
        },
        {
          "name": "Grenada",
          "code": "GD"
        },
        {
          "name": "Guadeloupe",
          "code": "GP"
        },
        {
          "name": "Guam",
          "code": "GU"
        },
        {
          "name": "Guatemala",
          "code": "GT"
        },
        {
          "name": "Guernsey",
          "code": "GG"
        },
        {
          "name": "Guinea",
          "code": "GN"
        },
        {
          "name": "Guinea-Bissau",
          "code": "GW"
        },
        {
          "name": "Guyana",
          "code": "GY"
        },
        {
          "name": "Haiti",
          "code": "HT"
        },
        {
          "name": "Heard Island and Mcdonald Islands",
          "code": "HM"
        },
        {
          "name": "Holy See (Vatican City State)",
          "code": "VA"
        },
        {
          "name": "Honduras",
          "code": "HN"
        },
        {
          "name": "Hong Kong",
          "code": "HK"
        },
        {
          "name": "Hungary",
          "code": "HU"
        },
        {
          "name": "Iceland",
          "code": "IS"
        },
        {
          "name": "India",
          "code": "IN"
        },
        {
          "name": "Indonesia",
          "code": "ID"
        },
        {
          "name": "Iran, Islamic Republic Of",
          "code": "IR"
        },
        {
          "name": "Iraq",
          "code": "IQ"
        },
        {
          "name": "Ireland",
          "code": "IE"
        },
        {
          "name": "Isle of Man",
          "code": "IM"
        },
        {
          "name": "Israel",
          "code": "IL"
        },
        {
          "name": "Italy",
          "code": "IT"
        },
        {
          "name": "Jamaica",
          "code": "JM"
        },
        {
          "name": "Japan",
          "code": "JP"
        },
        {
          "name": "Jersey",
          "code": "JE"
        },
        {
          "name": "Jordan",
          "code": "JO"
        },
        {
          "name": "Kazakhstan",
          "code": "KZ"
        },
        {
          "name": "Kenya",
          "code": "KE"
        },
        {
          "name": "Kiribati",
          "code": "KI"
        },
        {
          "name": "Korea, Republic of",
          "code": "KR"
        },
        {
          "name": "Kuwait",
          "code": "KW"
        },
        {
          "name": "Kyrgyzstan",
          "code": "KG"
        },
        {
          "name": "Latvia",
          "code": "LV"
        },
        {
          "name": "Lebanon",
          "code": "LB"
        },
        {
          "name": "Lesotho",
          "code": "LS"
        },
        {
          "name": "Liberia",
          "code": "LR"
        },
        {
          "name": "Libyan Arab Jamahiriya",
          "code": "LY"
        },
        {
          "name": "Liechtenstein",
          "code": "LI"
        },
        {
          "name": "Lithuania",
          "code": "LT"
        },
        {
          "name": "Luxembourg",
          "code": "LU"
        },
        {
          "name": "Macao",
          "code": "MO"
        },
        {
          "name": "North Macedonia",
          "code": "MK"
        },
        {
          "name": "Madagascar",
          "code": "MG"
        },
        {
          "name": "Malawi",
          "code": "MW"
        },
        {
          "name": "Malaysia",
          "code": "MY"
        },
        {
          "name": "Maldives",
          "code": "MV"
        },
        {
          "name": "Mali",
          "code": "ML"
        },
        {
          "name": "Malta",
          "code": "MT"
        },
        {
          "name": "Marshall Islands",
          "code": "MH"
        },
        {
          "name": "Martinique",
          "code": "MQ"
        },
        {
          "name": "Mauritania",
          "code": "MR"
        },
        {
          "name": "Mauritius",
          "code": "MU"
        },
        {
          "name": "Mayotte",
          "code": "YT"
        },
        {
          "name": "Mexico",
          "code": "MX"
        },
        {
          "name": "Micronesia, Federated States of",
          "code": "FM"
        },
        {
          "name": "Moldova, Republic of",
          "code": "MD"
        },
        {
          "name": "Monaco",
          "code": "MC"
        },
        {
          "name": "Mongolia",
          "code": "MN"
        },
        {
          "name": "Montserrat",
          "code": "MS"
        },
        {
          "name": "Morocco",
          "code": "MA"
        },
        {
          "name": "Mozambique",
          "code": "MZ"
        },
        {
          "name": "Myanmar",
          "code": "MM"
        },
        {
          "name": "Namibia",
          "code": "NA"
        },
        {
          "name": "Nauru",
          "code": "NR"
        },
        {
          "name": "Nepal",
          "code": "NP"
        },
        {
          "name": "Netherlands",
          "code": "NL"
        },
        {
          "name": "Netherlands Antilles",
          "code": "AN"
        },
        {
          "name": "New Caledonia",
          "code": "NC"
        },
        {
          "name": "New Zealand",
          "code": "NZ"
        },
        {
          "name": "Nicaragua",
          "code": "NI"
        },
        {
          "name": "Niger",
          "code": "NE"
        },
        {
          "name": "Nigeria",
          "code": "NG"
        },
        {
          "name": "Niue",
          "code": "NU"
        },
        {
          "name": "Norfolk Island",
          "code": "NF"
        },
        {
          "name": "Northern Mariana Islands",
          "code": "MP"
        },
        {
          "name": "Norway",
          "code": "NO"
        },
        {
          "name": "Oman",
          "code": "OM"
        },
        {
          "name": "Pakistan",
          "code": "PK"
        },
        {
          "name": "Palau",
          "code": "PW"
        },
        {
          "name": "Palestinian Territory, Occupied",
          "code": "PS"
        },
        {
          "name": "Panama",
          "code": "PA"
        },
        {
          "name": "Papua New Guinea",
          "code": "PG"
        },
        {
          "name": "Paraguay",
          "code": "PY"
        },
        {
          "name": "Peru",
          "code": "PE"
        },
        {
          "name": "Philippines",
          "code": "PH"
        },
        {
          "name": "Pitcairn Islands",
          "code": "PN"
        },
        {
          "name": "Poland",
          "code": "PL"
        },
        {
          "name": "Portugal",
          "code": "PT"
        },
        {
          "name": "Puerto Rico",
          "code": "PR"
        },
        {
          "name": "Qatar",
          "code": "QA"
        },
        {
          "name": "Reunion",
          "code": "RE"
        },
        {
          "name": "Romania",
          "code": "RO"
        },
        {
          "name": "Russian Federation",
          "code": "RU"
        },
        {
          "name": "Rwanda",
          "code": "RW"
        },
        {
          "name": "Saint Helena",
          "code": "SH"
        },
        {
          "name": "Saint Kitts and Nevis",
          "code": "KN"
        },
        {
          "name": "Saint Lucia",
          "code": "LC"
        },
        {
          "name": "Saint Pierre and Miquelon",
          "code": "PM"
        },
        {
          "name": "Saint Vincent and the Grenadines",
          "code": "VC"
        },
        {
          "name": "Samoa",
          "code": "WS"
        },
        {
          "name": "San Marino",
          "code": "SM"
        },
        {
          "name": "Sao Tome and Principe",
          "code": "ST"
        },
        {
          "name": "Saudi Arabia",
          "code": "SA"
        },
        {
          "name": "Senegal",
          "code": "SN"
        },
        {
          "name": "Serbia and Montenegro",
          "code": "CS"
        },
        {
          "name": "Seychelles",
          "code": "SC"
        },
        {
          "name": "Sierra Leone",
          "code": "SL"
        },
        {
          "name": "Singapore",
          "code": "SG"
        },
        {
          "name": "Slovakia",
          "code": "SK"
        },
        {
          "name": "Slovenia",
          "code": "SI"
        },
        {
          "name": "Solomon Islands",
          "code": "SB"
        },
        {
          "name": "Somalia",
          "code": "SO"
        },
        {
          "name": "South Africa",
          "code": "ZA"
        },
        {
          "name": "South Georgia and the South Sandwich Islands",
          "code": "GS"
        },
        {
          "name": "Spain",
          "code": "ES"
        },
        {
          "name": "Sri Lanka",
          "code": "LK"
        },
        {
          "name": "Sudan",
          "code": "SD"
        },
        {
          "name": "Suriname",
          "code": "SR"
        },
        {
          "name": "Svalbard and Jan Mayen",
          "code": "SJ"
        },
        {
          "name": "Swaziland",
          "code": "SZ"
        },
        {
          "name": "Sweden",
          "code": "SE"
        },
        {
          "name": "Switzerland",
          "code": "CH"
        },
        {
          "name": "Syrian Arab Republic",
          "code": "SY"
        },
        {
          "name": "Taiwan",
          "code": "TW"
        },
        {
          "name": "Tajikistan",
          "code": "TJ"
        },
        {
          "name": "Tanzania, United Republic of",
          "code": "TZ"
        },
        {
          "name": "Thailand",
          "code": "TH"
        },
        {
          "name": "Timor-Leste",
          "code": "TL"
        },
        {
          "name": "Togo",
          "code": "TG"
        },
        {
          "name": "Tokelau",
          "code": "TK"
        },
        {
          "name": "Tonga",
          "code": "TO"
        },
        {
          "name": "Trinidad and Tobago",
          "code": "TT"
        },
        {
          "name": "Tunisia",
          "code": "TN"
        },
        {
          "name": "Turkey",
          "code": "TR"
        },
        {
          "name": "Turkmenistan",
          "code": "TM"
        },
        {
          "name": "Turks and Caicos Islands",
          "code": "TC"
        },
        {
          "name": "Tuvalu",
          "code": "TV"
        },
        {
          "name": "Uganda",
          "code": "UG"
        },
        {
          "name": "Ukraine",
          "code": "UA"
        },
        {
          "name": "United Arab Emirates",
          "code": "AE"
        },
        {
          "name": "United Kingdom",
          "code": "GB"
        },
        {
          "name": "United States",
          "code": "US"
        },
        {
          "name": "United States Minor Outlying Islands",
          "code": "UM"
        },
        {
          "name": "Uruguay",
          "code": "UY"
        },
        {
          "name": "Uzbekistan",
          "code": "UZ"
        },
        {
          "name": "Vanuatu",
          "code": "VU"
        },
        {
          "name": "Venezuela",
          "code": "VE"
        },
        {
          "name": "Vietnam",
          "code": "VN"
        },
        {
          "name": "Virgin Islands, British",
          "code": "VG"
        },
        {
          "name": "Virgin Islands, U.S.",
          "code": "VI"
        },
        {
          "name": "Wallis and Futuna",
          "code": "WF"
        },
        {
          "name": "Western Sahara",
          "code": "EH"
        },
        {
          "name": "Yemen",
          "code": "YE"
        },
        {
          "name": "Zambia",
          "code": "ZM"
        },
        {
          "name": "Zimbabwe",
          "code": "ZN"
        }
      ];

      const mappedValues = countriesData.map((country) => ({
        label: country.name,
        value: country.name,
      }));
      setCountries(mappedValues);

    };
    fetchCountries();
  }, []);

  return (
    <div className="bg-white shadow sm:rounded-lg flex flex-col">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          Personal details
        </h3>
        <p className="mt-1 max-w-2xl text-gray-500">
          Keep your details current to ensure seamless communication and
          services
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {isEditMode ? (
            // Editable fields
            <>
              <TextField
                label="Firstname"
                value={firstName}
                onChange={setFirstName}
              />
              <TextField
                label="Lastname"
                value={lastName}
                onChange={setLastName}
              />
              <TextField
                label="Phone number"
                type="tel"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
              <TextField
                label="Date of birth"
                type="date"
                value={dateOfBirth}
                onChange={setDateOfBirth}
              />
              <div className="relative">
                <TextField
                  label="Country"
                  value={nationality}
                  onChange={setNationality}
                  isSelectable={true}
                  selectableData={countries}
                />
              </div>
            </>
          ) : (
            // Display fields
            <>
              <DisplayField label="Firstname" value={firstName} />
              <DisplayField label="Lastname" value={lastName} />
              <DisplayField
                label="Email address"
                value={email}
                verified={isEmailVerified}
              />
              <DisplayField
                label="Phone number"
                value={phoneNumber || 'Add your phone number'}
                verified={isPhoneVerified}
              />
              <DisplayField
                label="Date of birth"
                value={dateOfBirth || 'Enter your date of birth'}
              />
              <DisplayField label="Nationality" value={nationality} />
            </>
          )}
        </dl>
      </div>
      <div className="flex justify-between px-4 py-3 bg-gray-50 text-right sm:px-6">
        {isEditMode ? (
          <>
            <button
              onClick={handleCancelClick}
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
      </div>
      {toastMessage && (
        <div className="m-2">
          <Toast
            type={toastMessage.type}
            message={toastMessage.message}
            dismissError={clearToastMessage}
          />
        </div>
      )}
    </div>
  );
};

const DisplayField = ({ label, value, verified }) => (
  <div
    className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${verified ? 'bg-gray-50' : ''
      }`}
  >
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-gray-900 sm:mt-0 sm:col-span-2">
      {value}{' '}
      {verified && <span className="text-green-500 font-medium">Verified</span>}
    </dd>
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
  type = 'text',
  isSelectable,
  selectableData,
}) => (
  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 sm:mt-0 sm:col-span-2">
      {isSelectable ? (
        <Select
          options={selectableData}
          value={selectableData.find((country) => country.value === value)}
          onChange={(selectedOption) => onChange(selectedOption.value)}
        />
      ) : (
        <input
          type={type}
          className="mt-1 border py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm md:text-base  rounded-md"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </dd>
  </div>
);

export default ProfileDetailsPanel;
