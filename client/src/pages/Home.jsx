import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
const Home = () => {
    return (
        <>
        <Navbar/>
        <p>Hello World, this is home</p>
        <button className="bg-blue-300">hello baby</button>
        </>
    )
}

export default Home;