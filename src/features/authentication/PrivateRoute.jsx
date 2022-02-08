import { Route, Navigate } from "react-router";
import { useAuth } from "./authSlice";

export const PrivateRoute = ({ path, ...props }) => {
	const {
		authentication: { token },
	} = useAuth();

	return token ? (
		<Route path={path} {...props} />
	) : (
		<Navigate to="/login" replace />
	);
};
