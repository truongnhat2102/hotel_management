import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/ux/toast/Toast';
import { REGISTRATION_MESSAGES } from '../../utils/constants';
import { Formik, Form, Field } from 'formik';
import Schemas from '../../utils/validation-schemas';

const Register = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await fetch("http://localhost:8080/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email,
        password: values.password,
        fullname: values.firstName + ' ' + values.lastName
      })
    });
    
    console.log('response', response);
    if (response.ok) {
      setToastMessage(REGISTRATION_MESSAGES.SUCCESS);
      setShowToast(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setToastType('error');
      setToastMessage(response.errors[0]);
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="register__form">
        <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={Schemas.signupSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="w-full max-w-lg p-4 shadow-md md:p-10">
                  <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-brand">
                      Join the Adventure!
                    </h2>
                    <p className="text-gray-500">
                      Create your account and start your journey with us
                    </p>
                  </div>
                  <div className="flex flex-wrap mb-6 -mx-3">
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0 relative">
                      <Field
                        name="firstName"
                        placeholder="First Name"
                        autoComplete="given-name"
                        className={`${errors.firstName && touched.firstName ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                      />
                    </div>
                    <div className="w-full px-3 md:w-1/2">
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        className={`${errors.lastName && touched.lastName ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <Field
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      className={`${errors.email && touched.email ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                    />
                  </div>
                  <div className="mb-6">
                    <Field
                      name="phoneNumber"
                      placeholder="Phone"
                      autoComplete="tel"
                      className={`${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                    />
                  </div>
                  <div className="mb-6">
                    <Field
                      name="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className={`${errors.password && touched.password ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                    />
                  </div>
                  <div className="mb-6">
                    <Field
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''} border block w-full px-4 py-3 mb leading-tight text-gray-700 bg-gray-200 rounded appearance-none focus:outline-none focus:bg-white`}
                    />
                  </div>
                  <div className="flex items-center w-full my-3">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-bold text-white rounded bg-brand hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                      Register
                    </button>
                  </div>
                  <Link
                    to="/login"
                    className="inline-block w-full text-lg text-center text-gray-500 align-baseline hover:text-blue-800"
                  >
                    Back to login
                  </Link>
                  {showToast && (
                    <Toast
                      type={toastType}
                      message={toastMessage}
                      dismissError
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
