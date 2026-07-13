import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Button danger onClick={handleLogout}>
      Logout
    </Button>
  );
}