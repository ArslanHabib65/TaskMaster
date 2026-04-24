import './Navbar.css';

function Navbar(){
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-left'>
                    <h1 className='navbar-title'>TaskMaster</h1>
                </div>

                <div className='navbar-right'>
                    <p className='navbar-tagline'>Stay Productive</p>
                </div>
            </nav>
        </>
    );
}

export default Navbar;