import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UploadStory from "../components/UploadStory";
import CompWrapper from "../components/CompWrapper";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import Stories from "../components/Stories";
const Home = () => {
  const user = useSelector((state) => state.user);
  const isWideScreen = useMediaQuery("(min-width:1000px)");
  return (
    <>
        <Navbar />
        <Box width="100%" padding="1rem 6%" display={isWideScreen ? "flex" : "block"} justifyContent="space-between">
            <CompWrapper flexBasis={isWideScreen ? "30%" : undefined}>kasdjflkjd</CompWrapper>
            <CompWrapper flexBasis={isWideScreen ? "40%" : undefined}>
                <Stories />
            </CompWrapper>
            <CompWrapper flexBasis={isWideScreen ? "30%" : undefined}>jasldfkjsld</CompWrapper>
        </Box>
        
    </>
  );
};

export default Home;
