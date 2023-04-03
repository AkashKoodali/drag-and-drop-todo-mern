import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const PrivateRoutes: React.FC = () =>  {
  const { auth } = useAuth();
  console.log({ auth });

  if (auth === undefined) return <h1>Loading.....</h1>;

  return auth === true ? <Outlet /> : <Navigate to="/auth/signin" />;
}

export default PrivateRoutes;