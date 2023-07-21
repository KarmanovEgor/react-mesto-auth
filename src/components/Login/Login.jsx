import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ComponentLogReg from '../ComponentLogReg/ComponentLogReg
import Input from '../Input/Input'

export default function Login({ name, handleLogin }) {
    const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

    function onLogin(e) {
        e.preventDefault()
        handleLogin(values.password, values.email)
    }
return (
<ComponentLogReg name ={name} onSubmit={onLogin} isValid={isValid}>
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
}

//   return (
//     <section className="login">
//       <h2 className="login__header">Вход</h2>
//       <form className="login__form" onSubmit={handleSubmit}>
//         <input className="login__input" type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}/>
//         <input className="login__input" type="password" id="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleInputChange}/>
//         <div className="login__footer">
//           <button className="login__button" type="submit">Войти</button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Login;