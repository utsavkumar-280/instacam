import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { useAuth } from "../authSlice";
import { signupUser } from "../authSlice";
import signupStyles from "../Auth.module.css";

export const Signup = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isAlsoHidden, setIsAlsoHidden] = useState(true);

	const dispatch = useDispatch();
	const {
		signUp: { status, error },
	} = useAuth();

	const signup = async (values) => {
		setIsLoading(true);
		const userDetails = {
			firstname: values.firstName,
			lastname: values.lastName,
			email: values.email,
			userName: values.userName,
			password: values.password,
		};
		const loginResponse = await dispatch(signupUser(userDetails));
		if (loginResponse) {
			setIsLoading(false);
		}
	};

	return (
		<div className={signupStyles.container}>
			{status === "success" ? (
				<div className={signupStyles.content_card}>
					<h1 className={signupStyles.form_head}>Thank you for Signing up!</h1>
					<Link to="/login" className={signupStyles.form_links}>
						Login
					</Link>
				</div>
			) : (
				<div className={signupStyles.content_card}>
					<h1 className={signupStyles.form_head}>Sign Up</h1>
					<Formik
						initialValues={{
							firstName: "",
							lastName: "",
							email: "",
							userName: "",
							password: "",
							passwordConf: "",
						}}
						validationSchema={Yup.object({
							firstName: Yup.string()
								.max(15, "Must be 15 characters or less")
								.required("First name is required"),
							lastName: Yup.string()
								.max(20, "Must be 20 characters or less")
								.required("Last name is required"),
							email: Yup.string()
								.email("Invalid email address")
								.required("Email is required"),
							userName: Yup.string().required("User name is required"),
							password: Yup.string()
								.matches(
									/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
									"password should contain minimum 8 characters (Atleast a number, an uppercase character and a lowercase character)"
								)
								.required("Password is required"),
							passwordConf: Yup.string()
								.oneOf([Yup.ref("password"), null], "Passwords must match")
								.required("Password is required"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								console.log(values);
								signup(values);
								setSubmitting(false);
							}, 0);
						}}
					>
						<Form className={signupStyles.form_field_container}>
							<div className={signupStyles.input_control}>
								<label htmlFor="firstName" className={signupStyles.form_label}>
									First Name
								</label>
								<div className={signupStyles.input_field_container}>
									<Field
										name="firstName"
										type="text"
										placeholder="Enter firstname"
										className={signupStyles.input_field}
									/>
								</div>
								<ErrorMessage name="firstName" className="form-error" />
							</div>

							<div className={signupStyles.input_control}>
								<label htmlFor="lastName" className={signupStyles.form_label}>
									Last Name
								</label>
								<div className={signupStyles.input_field_container}>
									<Field
										name="lastName"
										type="text"
										placeholder="Enter listname"
										className={signupStyles.input_field}
									/>
								</div>
								<ErrorMessage name="lastName" className="form-error" />
							</div>

							<div className={signupStyles.input_control}>
								<label htmlFor="userName" className={signupStyles.form_label}>
									Username
								</label>
								<div className={signupStyles.input_field_container}>
									<Field
										name="userName"
										type="text"
										placeholder="Enter username"
										className={signupStyles.input_field}
									/>
								</div>
								<ErrorMessage name="userName" className="form-error" />
							</div>

							<div className={signupStyles.input_control}>
								<label htmlFor="email" className={signupStyles.form_label}>
									Email Address
								</label>
								<div className={signupStyles.input_field_container}>
									<Field
										name="email"
										type="email"
										placeholder="Enter email"
										className={signupStyles.input_field}
									/>
								</div>
								<ErrorMessage name="email" className="form-error" />
							</div>

							<div className={signupStyles.input_control}>
								<label htmlFor="password" className={signupStyles.form_label}>
									Password
								</label>
								<div className={signupStyles.input_field_container}>
									<span
										className={`${signupStyles.input_grid} ${signupStyles.width100}`}
									>
										<Field
											name="password"
											placeholder="Enter password"
											className={signupStyles.input_pass_field}
											type={isHidden ? "password" : "text"}
										/>
										<button
											type="button"
											className={signupStyles.input_pass_cta}
											onClick={() => setIsHidden((isHidden) => !isHidden)}
										>
											{isHidden ? (
												<FaEyeSlash className={signupStyles.hide_cta} />
											) : (
												<FaEye className={signupStyles.hide_cta} />
											)}
										</button>
									</span>
								</div>
								<ErrorMessage name="password" className="form-error" />
							</div>

							<div className={signupStyles.input_control}>
								<label
									htmlFor="passwordConf"
									className={signupStyles.form_label}
								>
									Confirm Password
								</label>
								<div className={signupStyles.input_field_container}>
									<span
										className={`${signupStyles.input_grid} ${signupStyles.width100}`}
									>
										<Field
											name="passwordConf"
											className={signupStyles.input_pass_field}
											placeholder="Re-enter password"
											type={isAlsoHidden ? "password" : "text"}
										/>
										<button
											type="button"
											className={signupStyles.input_pass_cta}
											onClick={() =>
												setIsAlsoHidden((isAlsoHidden) => !isAlsoHidden)
											}
										>
											{isAlsoHidden ? (
												<FaEyeSlash className={signupStyles.hide_cta} />
											) : (
												<FaEye className={signupStyles.hide_cta} />
											)}
										</button>
									</span>
								</div>
								<ErrorMessage name="passwordConf" className="form-error" />
							</div>
							{error && (
								<div className={signupStyles.inpurt_error}>{error}</div>
							)}

							<button type="submit" className={signupStyles.form_submit_cta}>
								{isLoading ? "Creating Account..." : "Create Account"}
							</button>
							<p
								className={`${signupStyles.form_text} ${signupStyles.marginTop1}`}
							>
								Already have an account.
								<span>
									<Link to="/login" className={signupStyles.form_links}>
										Login
									</Link>
								</span>
							</p>
						</Form>
					</Formik>
				</div>
			)}
		</div>
	);
};
