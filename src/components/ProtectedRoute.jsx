import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children}) {
    const user=useSelector((store)=>store.user);

    if(!user){
    return <Navigate to="/login"/>
    }
  return children;
}
