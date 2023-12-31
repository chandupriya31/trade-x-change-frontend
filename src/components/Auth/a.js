import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../../index.css';

export default function Register(props) {
   const navigate = useNavigate();
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [role, setRole] = useState('');
   const [serverErrors, setServerErrors] = useState([]);
   const [formErrors, setFormErrors] = useState({});

   useEffect(() => {
      const savedFormData = JSON.parse(localStorage.getItem('registerFormData')) || {};
      setUsername(savedFormData.username || '');
      setEmail(savedFormData.email || '');
      setPassword(savedFormData.password || '');
      setRole(savedFormData.role || 'customer');
   }, [])

   const validationSchema = Yup.object().shape({
      username: Yup.string().required('*Username required'),
      email: Yup.string().email('*Invalid email').required('*Email required'),
      password: Yup.string().required('*Password required'),
   });

   const runValidation = async () => {
      try {
         await validationSchema.validate({ username, email, password }, { abortEarly: false });
         return {};
      } catch (validationErrors) {
         const errors = {};
         validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
         });
         return errors;
      }
   };

   const handleUserTypeChange = (e) => {
      setRole(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errors = await runValidation();

      if (Object.keys(errors).length === 0) {
         const formData = {
            username,
            email,
            password,
            role
         };

         if (role === 'customer') {
            try {
               const response = await axios.post('/api/user/register', formData);
               navigate('/login');
               setUsername('');
               setEmail('');
               setPassword('');
               setRole('');
            } catch (e) {
               console.log(e)
               setServerErrors(e.response?.data.message);
            }
         } else {
            localStorage.setItem('registerFormData', JSON.stringify(formData));
            navigate('/company', { state: { formData } });
         }
      } else {
         setFormErrors(errors);
      }
   }

   return (
      <div className="container mt-5">
         <div className="row justify-content-center">
            <div className="col-md-4">
               <div className="card bg-light p-4 rounded shadow p-3 mb-5 bg-body-tertiary rounded">
                  <h2 className="mb-4">Register</h2>

                  {serverErrors && serverErrors.length > 0 && (
                     <div className="alert alert-danger">
                        {serverErrors.map(ele, i => (
                           <li key={i}>{ele}</li>
                        ))}
                     </div>
                  )}
                  <div className="mb-3">
                     <label htmlFor="username" className="form-label">Username</label>
                     <input
                        type="text"
                        className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                     />
                     {formErrors.username && (
                        <div className="invalid-feedback">{formErrors.username}</div>
                     )}
                  </div>
                  <div className="mb-3">
                     <label htmlFor="email" className="form-label">Email</label>
                     <input
                        type="email"
                        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                     {formErrors.email && (
                        <div className="invalid-feedback">{formErrors.email}</div>
                     )}
                  </div>
                  <div className="mb-3">
                     <label htmlFor="password" className="form-label">Password</label>
                     <input
                        type="password"
                        className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                     {formErrors.password && (
                        <div className="invalid-feedback">{formErrors.password}</div>
                     )}
                  </div>
                  <div className="mb-3">
                     <label className="form-check-label me-2">
                        <input
                           type="radio"
                           className="form-check-input"
                           value="customer"
                           checked={role === 'customer'}
                           onChange={handleUserTypeChange}
                        />
                        Customer
                     </label>
                     <label className="form-check-label">
                        <input
                           type="radio"
                           className="form-check-input"
                           value="companyAdmin"
                           checked={role === 'companyAdmin'}
                           onChange={handleUserTypeChange}
                        />
                        Company
                     </label>
                  </div>
                  <button onClick={handleSubmit} className="btn btn-primary">
                     {role === 'customer' ? 'Submit' : 'Next'}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
