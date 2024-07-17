// src/components/Sidebar.js
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  top: 20px; /* Ajusta según tu necesidad */
  left: 10px; /* Ajusta según tu necesidad */
  width: 200px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Asegura que esté por encima de otros elementos */

`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  color: white
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  background-color: white;
  border-radius: 50%;
  margin-right: 10px;
`;

const Sidebar = ({ items, onItemClick }: any) => {
  return (
    <SidebarContainer>
      {items.map((item: any, index: any) => (
        <ListItem key={index} onClick={() => onItemClick(index)}>
          <Dot />
          {item.title}
        </ListItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;