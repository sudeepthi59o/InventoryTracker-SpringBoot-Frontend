import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";


function Product({product}) {
    const {auth} = useContext(AuthContext)
    
    return(
    <>
    {product.name} - {product.price} - {product.quantity} - {product.categoryDTO.name} - {product.supplierDTO.name}{auth.role === 'admin' && (
              <div>
                <Link to={`/edit-product/${product.id}`}>Edit</Link>
                <Link to={`/delete-product/${product.id}`}>Delete</Link>
              </div>
            )}

</>);
}
export default Product;