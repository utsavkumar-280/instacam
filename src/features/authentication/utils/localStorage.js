export const setLocalStorage = (session) => {
	localStorage?.setItem("session", JSON.stringify(session));
};

export const getLocalStorage = () => {
	const defaultValues = {
		token: "",
		userId: "",
		name: "",
		userName: "",
		profilePic: "",
	};
	return JSON.parse(localStorage?.getItem("session")) || defaultValues;
};

export const updateLocalStorage = (profilePic) => {
	const sessionDetails = JSON.parse(localStorage?.getItem("session"));
	sessionDetails.profilePic = profilePic;
	localStorage?.setItem("session", JSON.stringify(sessionDetails));
};
