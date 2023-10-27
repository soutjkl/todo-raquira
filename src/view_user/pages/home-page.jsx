import { BrowserRouter, Routes, Route, Link, useMatch, resolvePath, useResolvedPath } from "react-router-dom";
import CategoriesComponent from "../components/categories-component";
import CotizationComponent from "../components/cotization-component";
import SearchComponent from "../components/search-component";
import WorkshopComponent from "../components/workshop-component";

import LandingPage from "./landing-page";

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <li className="nav-item btn-primary mt-5 mb-5" id="navigation-button">
            <Link to={to} {...props} className={isActive ? "nav-link p-4 active" : "nav-link p-4"} aria-current="page">{children}</Link>
        </li>
    )
}

export default function HomePage({landing}) {

    return (

        <BrowserRouter>


            <div className="sidebar">

                <aside className="sidebar__sidebar">
                    <div className="m-4">

                    <Link id="navigation-button" onClick={()=>landing(!landing)} to='/landing' style={{textDecoration:'none', color:'rgba(76, 70, 61, 1)'}}>← SALIR</Link>
                    </div>
                    <ul className="nav nav-pills nav-fill flex-column " id="navigation-menu">
                        <CustomLink to='/search'>BUSCAR →</CustomLink>
                        <CustomLink to='/categories'>CATEGORÍAS →</CustomLink>
                        <CustomLink to='/cotization'>COTIZACIÓN →</CustomLink>
                        <CustomLink to='/workshop'>TALLERES →</CustomLink>


                    </ul>

                </aside>
                <main className="sidebar__main">
                    <Routes>
                        <Route path='/landing'></Route>
                        <Route path='/search' element={<SearchComponent />}></Route>
                        <Route path='/categories' element={<CategoriesComponent />}></Route>
                        <Route path='/cotization' element={<CotizationComponent />}></Route>
                        <Route path='/workshop' element={<WorkshopComponent />}></Route>
                    </Routes>

                </main>
            </div>

        </BrowserRouter>
    )
}
