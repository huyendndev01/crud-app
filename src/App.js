import Container from "react-bootstrap/esm/Container";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AppRoute from "./routes/AppRoute";
import { useEffect } from "react";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
