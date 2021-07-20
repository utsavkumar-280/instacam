import { Route, Navigate } from "react-router";

export const PrivateRoute = ({ path, ...props }) => {
	return true ? (
		<Route path={path} {...props} />
	) : (
		<Navigate to="/login" replace />
	);
};
