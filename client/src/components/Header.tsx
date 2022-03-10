import React from 'react';
import styled from 'styled-components';
const Header = (props: {
  brand: { name: string; to: string },
  links: Array<{ name: string, to: string }>
}) => {
  const { brand, links } = props;
  const NavLinks: any = () => links.map((link: { name: string, to: string }) => <Li key={link.name}><a href={link.to}>{link.name}</a></Li>);
  return (
    <Navbar>
      <Brand href={brand.to}>{brand.name}</Brand>
      <Li>
        <NavLinks />
      </Li>
    </Navbar >
  );
};

const Theme = {
  colors: {
    bg: `#534029`,
    light: `#F0E6DB`,
  },
  fonts: {
    body: `Roboto`,
    heading: `Roboto`,
  }
}

const Navbar = styled.h1`
  background: ${Theme.colors.light};
  font-family: ${Theme.fonts.heading};
  text-color: #534029;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a { color: white; text-decoration: none; }`;

const Brand = styled.a`
  font-weight: bold;
  color: ${Theme.colors.light};
  margin-left: 1rem;
  padding-right: 1rem;`;

const Li = styled.li`
  class: current;
  flex: 0 0 auto;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  background-color: ${Theme.colors.bg};
  color: ${Theme.colors.bg};
  height: 100%;
  justify-content: center;
  text-decoration: none;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  display: flex;
  font-size: 14px;
  height: 50px;
  justify-content: center;
  line-height: 16px;
  margin: 0 10px ;
  text-decoration: none;
  white-space: nowrap;`;


export default Header;