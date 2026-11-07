import {  APP_TAGLINE, getAppName } from "../constants";
import Button from "./ui/Button";

interface HeaderProps {
  userName: string;
  onLogout: ()=> void
}

function Header({ userName, onLogout }: HeaderProps) {
  return (
    <>
      <header className="app-header">
        <div className="logo">{getAppName()}</div>
        <div className="header-user">
          <p className='tagline'> Hi {userName}! {APP_TAGLINE}</p>
          <Button onClick={onLogout}>Log Out</Button>
        </div>
      </header>
    </>
  );
}

export default Header;
