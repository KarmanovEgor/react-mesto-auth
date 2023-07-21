import logo from "../../images/logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        title="логотип локация"
        alt="логотип локация"
        src={logo}
      />
    </header>
  );
}
