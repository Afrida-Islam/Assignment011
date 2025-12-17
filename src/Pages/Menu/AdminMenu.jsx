import { MdAddBusiness, MdManageAccounts, MdAnalytics } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdAddBusiness}
        label="Add Scholarship"
        address="/dashboard/add-scholarship"
      />
      <MenuItem
        icon={FaUniversity}
        label="Manage Scholarships"
        address="manage-scholarships"
      />
      <MenuItem
        icon={MdManageAccounts}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem icon={MdAnalytics} label="Analytics" address="analytics" />
    </>
  );
};
export default AdminMenu;
