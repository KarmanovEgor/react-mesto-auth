import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import ComponentLogReg from '../ComponentLogReg/ComponentLogReg'



export default function Register({ name, handleRegister }) {
    const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

    function onRegister(e) {
        e.preventDefault()
        handleRegister(values.password, values.email)
    }
return (
<ComponentLogReg name ={name} onSubmit={onRegister} isValid={isValid}>
    <Input 
    name = 'email'
    type = 'email'
    placeholder = {'Email'}
    value = {values.email}
    onChange={handleChange} />
      <Input 
    name = 'password'
    type = 'password'
    placeholder = {'пароль'}
    value = {values.password}
    onChange={handleChange}
    isInputValid={isInputValid.password}
    error={errors.password} />
    



</ComponentLogReg> 


)








//   return (
//     <section className="login">
//       <h2 className="login__header">Регистрация</h2>
//       <form className="login__form" onSubmit={handleSubmit}>
//         <input
//           className="login__input"
//           type="email"
//           name="email"
//           id="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           className="login__input"
//           type="password"
//           name="password"
//           id="password"
//           placeholder="Пароль"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <div className="login__footer">
//           <button className="login__button" type="submit">
//             Зарегистрироваться
//           </button>
//           <p className="login__help">
//             Уже зарегистрированы?{' '}
//             <Link className="login__help-link" to="/sign-in">
//               Войти
//             </Link>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
}

// export default Register;