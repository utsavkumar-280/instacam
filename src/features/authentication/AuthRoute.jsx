import { Route, Navigate } from "react-router";
import { useAuth } from "./authSlice";

export const AuthRoute = ({ path, ...props }) => {
	const {
		authentication: { token },
	} = useAuth();

	return token ? <Navigate replace to="/" /> : <Route path={path} {...props} />;
};
