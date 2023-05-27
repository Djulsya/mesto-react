import logo from '../images/headerlogo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сервиса место" />
    </header>
  )
}

export default Header