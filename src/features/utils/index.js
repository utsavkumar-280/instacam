let local;
local = "http://localhost:8080";
export const API_URL = local || "https://cine-insta.herokuapp.com";

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/df5ippkko";
export const CLOUDINARY_PRESET = "instacam_preset";

export const locationTextFormatter = (string) => {
	if (string?.length > 25) {
		const newString = string?.slice(0, 26).concat("...");
		return newString;
	}
	return string;
};

export const websiteTextFormatter = (string) => {
	if (string?.includes("http://")) {
		let newString = string?.replace("http://", "");
		if (newString?.length > 20) {
			newString = newString?.slice(0, 20).concat("...");
		}
		return newString;
	}

	if (string?.includes("https://")) {
		let newString = string?.replace("https://", "");
		if (newString?.length > 20) {
			newString = newString?.slice(0, 20).concat("...");
		}
		return newString;
	}
	return string;
};
