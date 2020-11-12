import React from 'react';
import './Header.scss';
import MainMenu from "./MainMenu";
import TopRightMenu from "./TopRightMenu";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="b-header">
      <Logo/>
      <MainMenu/>
      <TopRightMenu/>
    </div>
  );
}
