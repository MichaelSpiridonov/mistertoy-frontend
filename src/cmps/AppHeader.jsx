import { NavLink } from "react-router-dom";

export function AppHeader() {


    return (
        <header className="app-header full main-layout">
            <section className="app-nav">
            <h1 className="logo">Mister Toy</h1>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About us</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </section>
        </header>
    )
}