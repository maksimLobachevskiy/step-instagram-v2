import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Users from "./Users/Users";
import { useSelector } from "react-redux";
import Pagination from "./Pagination/Pagination";

const Dashboard = (props) => {
  const { usersData } = useSelector((store) => ({
    usersData: store.type.usersData,
  }));

  const { allUsersData } = useSelector((store) => ({
    allUsersData: store.allUsers.allUsersData,
  }));
    
  return (
    <>
      <Navbar />
      <div className="container tape">
        <Pagination />
        <Users allUsersData={allUsersData} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
