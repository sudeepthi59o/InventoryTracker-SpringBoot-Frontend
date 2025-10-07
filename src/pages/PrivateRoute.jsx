import { useContext } from "react"
import { AuthContext } from "../components/auth/AuthContext"

function PrivateRoute({element, adminOnly }) {
    const auth = useContext(AuthContext);

    if(!auth.isAuthenticated)
    {
        <Navigate to="/login"/>
    }

    if (adminOnly && auth.role !== 'admin') {
    return <Navigate to="/products" />;
  }

  return element;

}

export default PrivateRoute;