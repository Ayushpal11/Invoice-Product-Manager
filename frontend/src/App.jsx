import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col, Navbar, Nav, Card, Button, Offcanvas, Dropdown } from "react-bootstrap";
import { Route, Routes, Link } from "react-router-dom";
import { FaFileInvoice, FaPlus, FaList, FaBox } from "react-icons/fa";
import Invoice from "./pages/Invoice.jsx";
import InvoiceList from "./pages/InvoiceList.jsx";
import ProductForm from "./components/product/ProductForm.jsx";
import ProductList from "./pages/ProductList.jsx";
import Sidebar from './components/Sidebar.jsx';
import { useCurrencyData } from './redux/hooks.js'
import { useDispatch } from "react-redux";
import { setCurrencies } from "./redux/currenciesSlice.js"

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);
  const handleCloseSidebar = () => setShowSidebar(false);
  const [currency, setCurrency] = useState('INR');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const { currencies, selectedCurrency, selectCurrency } = useCurrencyData();
  const dispatch = useDispatch();

  // Handle conversion based on base and target currency
  const handleConvert = (targetCurrency) => {
    if (currencies[baseCurrency] && currencies[targetCurrency]) {
      setCurrency(targetCurrency);
      const conversionRate = currencies[targetCurrency] / currencies[baseCurrency];
      selectCurrency(targetCurrency);
    }
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_I5o3p7b7XSnKFC2xZGODp6NcJv0adsjGLgcgACMO');
        const data = await response.json();
        console.log(data.data);
        dispatch(setCurrencies(data.data));
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };
    fetchCurrencies();
  }, [dispatch]);

  return (
    <div className="App d-flex flex-column" style={{ height: "100vh" }}>
      {/* Navbar */}
      <Navbar
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#8b7ab5",
          height: "70px",
        }}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="text-dark">
            <h3>My Dashboard</h3>
          </Navbar.Brand>

          {/* Currency Dropdown
          <Dropdown className="ms-auto">
            <Dropdown.Toggle
              variant="outline-light"
              id="dropdown-basic"
              style={{ border: "none", color: "#fff" }}
            >
              Currency {`(${currency})`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>Currency Converter</Dropdown.Header>
              <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                {Object.keys(currencies).map((currency) => (
                  <Dropdown.Item key={currency} onClick={() => handleConvert(currency)}>
                    Convert to {currency}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown> */}

          {/* Sidebar Toggle Button for small screens */}
          <Button
            className="d-lg-none ms-3"
            variant="outline-light"
            onClick={handleToggleSidebar}
          >
            ☰
          </Button>
        </Container>
      </Navbar>

      <Container fluid className="flex-grow-1 d-flex" style={{ marginTop: '70px' }}>
        {/* Sidebar Offcanvas for small screens */}
        <Offcanvas show={showSidebar} onHide={handleCloseSidebar} responsive="lg">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Sidebar />
          </Offcanvas.Body>
        </Offcanvas>

        <main className="content flex-grow-1 p-3">
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<InvoiceList />} />
                <Route path="/create" element={<Invoice />} />
                <Route path="/create/:id" element={<Invoice />} />
                <Route path="/edit/:id" element={<Invoice />} />
                <Route path="/addproduct" element={<ProductForm />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/product/edit/:id" element={<ProductForm />} />
                <Route path="/invoices" element={<InvoiceList />} />
              </Routes>
            </Col>
          </Row>
        </main>
      </Container>
    </div>
  );
};

export default App;
