import React from 'react';
import { styled } from '@modulz/design-system';

const SidebarContainer = styled('div', {
 width: '200px',
 height: '100%',
 position: 'fixed',
 backgroundColor: '#f8f9fa',
 padding: '20px',
 boxSizing: 'border-box',
});

const Logo = styled('div', {
 width: '100%',
 padding: '20px 0',
 boxSizing: 'border-box',
 textAlign: 'center',
 fontSize: '24px',
 fontWeight: 'bold',
 color: '#333',
});

const SidebarList = styled('ul', {
 listStyleType: 'none',
 padding: '0',
});

const SidebarListItem = styled('li', {
 padding: '10px 0',
 borderBottom: '1px solid #eee',
});

const SidebarLink = styled('a', {
 textDecoration: 'none',
 color: '#333',
 '&:hover': {
    color: '#007bff',
 },
});

const Sidebar = () => {
 return (
    <SidebarContainer>
      <Logo>YOUR LOGO</Logo>
      <SidebarList>
        <SidebarListItem>
          <SidebarLink href="#">Dashboard</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Messages 3</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Account</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Chart</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Calendar</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Reports</SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <SidebarLink href="#">Search</SidebarLink>
        </SidebarListItem>
      </SidebarList>
    </SidebarContainer>
 );
};
export default Sidebar;