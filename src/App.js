import React, { useEffect } from "react";
import { Routes, useLocation } from "react-router";
import "./App.css";
import { useDispatch } from "react-redux";
import {
	usePrimarySelector,
	useThemeSelector,
} from "./features/display/displaySlice";
import {
	AuthRoute,
	PrivateRoute,
	Login,
	Signup,
	ForgotPass,
	Profile,
	Nav,
	Explore,
	Home,
	Display,
} from "./features";

function App() {
	const dispatch = useDispatch();
	const primary = usePrimarySelector();
	const theme = useThemeSelector();
	return (
		<div className={`app-container ${primary} ${theme}`}>
			<div className="app-main">
				<Nav />
				<div className="main-routes">
					<Routes>
						<AuthRoute path="/login" element={<Login />} />
						<AuthRoute path="/signup" element={<Signup />} />
						<AuthRoute path="/forgot-pass" element={<ForgotPass />} />

						<PrivateRoute path="/" element={<Home />} />
						<PrivateRoute
							path="/user-profile/:userName"
							element={<Profile />}
						/>
						<PrivateRoute path="/display" element={<Display />} />
					</Routes>
				</div>
				<Explore />
			</div>
		</div>
	);
}

export default App;
