import React from "react";
import React, { useEffect } from "react";
import { Routes, useLocation } from "react-router";
import "./App.css";
import { useDispatch } from "react-redux";
import { AuthRoute } from "./features";

function App() {
	return (
		<div className="app-conatiner">
			<div className="app-main">
				<Nav />
				<div>
					<Routes>
						<AuthRoute path="/login" element={<Login />} />
					</Routes>
				</div>
				<Explore />
			</div>
		</div>
	);
}

export default App;
