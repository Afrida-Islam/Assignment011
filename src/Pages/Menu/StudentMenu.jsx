import { MdOutlineLibraryBooks, MdOutlineReviews } from "react-icons/md";
import MenuItem from "./MenuItem";

const StudentMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineLibraryBooks}
        label="My Applications"
        address="my-applications"
      />
      <MenuItem
        icon={MdOutlineReviews}
        label="My Reviews"
        address="my-reviews"
      />
    </>
  );
};
export default StudentMenu;
