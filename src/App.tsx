import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Lifestyle from "./pages/Lifestyle";
import Tutorial from "./pages/Tutorial";

export default function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <a className="skip" href="#view">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
          Work <em>Plus+</em>
        </NavLink>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className={open ? "site-nav is-open" : "site-nav"} id="site-nav">
          <NavLink to="/" end data-nav="home" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/library" data-nav="library" onClick={() => setOpen(false)}>
            Library
          </NavLink>
          <NavLink to="/lifestyle" data-nav="lifestyle" onClick={() => setOpen(false)}>
            Lifestyle
          </NavLink>
        </nav>
      </header>
      <main id="view" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:category" element={<Library />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/item/:id" element={<Tutorial />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p className="brand">
            Work <em>Plus+</em>
          </p>
          <p>
            Train, move, recover, and fuel. A field guide for daily practice — general education, not medical advice.
          </p>
        </div>
      </footer>
    </>
  );
}
