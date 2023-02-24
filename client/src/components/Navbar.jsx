import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Navbar = () => {
    const dispatch = useDispatch();
    let theme = useSelector( (state) => state.theme);
    const user = useSelector( (state) => state.user);
    return (
        <nav className={` grid grid-cols-3 sm:grid-cols-2 bg-[${theme.light.primary}]`}>
            <div>
                <img alt="Zpeaks logo" width="100" height="50" />
            </div>
                <form className="w-full sm:hidden">
                    <input className="w-full" type="text" placeholder="&#x1F50E;&#xFE0E; Search..."/>
                </form>
                { user ? (
                    <p>user</p>
                ) : (
                    <div>
                    <button className={`font-bold text-lg text-${theme}-base`}>
                        Log In
                    </button>
                    <button className={`font-bold text-lg text-${theme}-base`}>
                        Sign Up
                    </button>
                    </div>
                )}
        </nav>
    )
}

export default Navbar;