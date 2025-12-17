import { MdOutlineAssessment, MdRateReview } from "react-icons/md";
import MenuItem from "./MenuItem";

const ModeratorMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineAssessment}
        label="Manage Applications"
        address="manage-applied-applications"
      />
      <MenuItem icon={MdRateReview} label="All Reviews" address="all-reviews" />
    </>
  );
};
export default ModeratorMenu;
