import React from "react";
import SwitchToDarkIcon from "../images/icon-moon.svg";
import SwitchToLightIcon from "../images/icon-sun.svg";

function Header({ themeLight, setThemeLight }) {
  const switchThemeIcon = themeLight ? SwitchToLightIcon : SwitchToDarkIcon;
  const altText = themeLight ? "LightMode" : "DarkMode";

  const changeTheme = () => {
    setThemeLight(!themeLight);
  };

  return (
    <header className={themeLight ? "light" : "dark"}>
      <h1>Todo</h1>
      <button className="btn switch-theme-btn" onClick={changeTheme}>
        <img src={switchThemeIcon} alt={altText} />
      </button>
    </header>
  );
}

export default Header;
