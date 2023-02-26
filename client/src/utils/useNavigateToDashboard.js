import { Link, useNavigate } from "react-router-dom";
const useNavigateToDashboard = () => {
  const navigate = useNavigate();
  return (user) => {
    switch (user?.roll) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "PATIENT":
        navigate("/patient");
        break;
      case "DOCTOR":
        navigate("/doctor");
        break;
      case "NORSE":
        navigate("/norse");
        break;
      case "RECEPTOR":
        navigate("/receptor");
        break;
      case "PHARMACY":
        navigate("/pharmacy");
        break;
      default:
        navigate("/");
        break;
    }
  };
};
export default useNavigateToDashboard;
