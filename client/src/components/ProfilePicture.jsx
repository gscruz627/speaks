import { Box } from "@mui/material";
const ProfilePicture = ({ size, picturePath }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="User"
        src={picturePath}
      />
    </Box>
  );
};

export default ProfilePicture;
