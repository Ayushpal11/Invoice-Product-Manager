import { NavLink } from 'react-router-dom';
import { FaList, FaBox } from 'react-icons/fa';
import { Nav } from "react-bootstrap";

const sidebarItems = [
  { path: '/invoices', icon: <FaList />, label: 'Invoices' },
  { path: '/products', icon: <FaBox />, label: 'Products' },
];

const Sidebar = () => {
  return (
    <aside className="sidebar bg-gradient text-white">
      <h5 className="text-center mt-3">Dashboard</h5>
      <Nav className="flex-column mt-4">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="sidebar-link d-flex align-items-center px-3 py-2"
            activeClassName="active"
            exact
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.label}</span>
          </NavLink>
        ))}
      </Nav>
    </aside>
  );
};

export default Sidebar;
