import { Route, Navigate } from "react-router";

export const AuthRoute = ({ path, ...props }) => {
	return false ? <Navigate replace to="/" /> : <Route path={path} {...props} />;
};
