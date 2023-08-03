
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header({name, data}) {
  console.log(data)
function onLogout(){
  localStorage.removeItem('jwt')
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
<div className={'header__block'}>
  <p className = 'header__block-email'>{data}</p>

  
  <Link to="/signin" className='header__login-link' onClick={onLogout}>Выйти</Link>
</div>

</>
}
    </header>
  );
}
