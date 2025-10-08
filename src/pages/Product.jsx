import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";
import { Link } from "react-router-dom";


function Product({product}) {
    const {auth} = useContext(AuthContext)
    console.log(auth)
    return(
    <>
    {product.name} - {product.price} - {product.quantity} - {product.categoryDTO.name} - {product.supplierDTO.name}{auth.role === 'ADMIN' && (
              <div>
                <Link to={`/edit-product/${product.id}`}>Edit</Link>  <Link to={`/delete-product/${product.id}`}>Delete</Link>
              </div>
            )}

</>);
}
export default Product;