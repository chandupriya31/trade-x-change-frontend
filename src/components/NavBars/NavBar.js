import { Link } from "react-router-dom";

export default function NavBar() {
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ marginTop: "10px" }}>
         <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="#">Products</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to='/company-list'>Companies</Link>
                  </li>
               </ul>
               <ul className="navbar-nav ms-auto">
                  {/* <li className="nav-item">
                     <Link className="nav-link" to='add-enquiry'>Enquiry</Link>
                  </li> */}
                  <li className="nav-item">
                     <Link className="nav-link" to='/register'>Register</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to="/login">Login</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}
