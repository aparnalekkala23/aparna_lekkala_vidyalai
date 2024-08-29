import React from 'react';
import styled from '@emotion/styled';
import Headroom from 'react-headroom';
const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
 
  top: 0,
  left: 0,
  zIndex: 1000,
}));

const ListItem = styled('li')(() => ({
  display: 'inline-block',
  paddingTop:15,
  paddingBottom:15,
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <Headroom>
       <div>
      <Navbar>
        <ul style={{margin:0}}>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </ul>
      </Navbar>
    </div>
    </Headroom>
   );
};

export default TopNavbar;
