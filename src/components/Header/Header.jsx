
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header({name, dataUser}) {
  console.log(dataUser)
function onLogout(){
  localStorage.removeItem('token')
}

  return (
    
    <header className="header">
      <img
        className="header__logo"
        title="логотип локация"
        alt="логотип локация"
        src={logo}
      />
     
{name === 'signup' || name === 'signin' ? 
<Link to={name === 'signup' ? '/signin' : '/signup'} className='header__login-link'>{name === "signup" ? "Вход" : "Регистрация" }</Link>
:
<>
<ul className='header__block'>
  <li className='header__block-email'>{dataUser}</li>
  <li>
    <Link to="/signin" className='header__login-link' onClick={onLogout}>Выйти</Link>
  </li>
</ul>

</>
}
    </header>
  );
}
