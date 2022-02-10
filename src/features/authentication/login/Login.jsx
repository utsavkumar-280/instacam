import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";
import { useAuth } from "../authSlice";
import loginStyles from "../Auth.module.css";

export const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isHidden, setIsHidden] = useState(true);
	const dispatch = useDispatch();

	const {
		login: { error },
	} = useAuth();

	const login = async (values) => {
		setIsLoading(true);
		const userDetails = {
			email: values.email,
			password: values.password,
		};
		const loginResponse = await dispatch(loginUser(userDetails));
		if (loginResponse) {
			setIsLoading(false);
		}
	};
	return (
		<div className={loginStyles.container}>
			<div className={loginStyles.content_card}>
				<h1 className={loginStyles.form_head}>Login</h1>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={Yup.object({
						email: Yup.string()
							.email("Invalid email address")
							.required("Email required"),
						password: Yup.string()
							.min(8, "pasword must be 8 characters or more")
							.required("Password required"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							console.log(values);
							login(values);
							setSubmitting(false);
						}, 400);
					}}
				>
					{(props) => (
						<Form className={loginStyles.form_field_container}>
							<div className={loginStyles.input_control}>
								<label htmlFor="email" className={loginStyles.form_label}>
									Email Address
								</label>
								<div className={loginStyles.input_field_container}>
									<Field
										name="email"
										type="email"
										placeholder="Enter email"
										className={loginStyles.input_field}
									/>
								</div>

								<ErrorMessage name="email" className="form-error" />
							</div>

							<div className={loginStyles.input_control}>
								<label htmlFor="password" className={loginStyles.form_label}>
									Password
								</label>
								<div className={loginStyles.input_field_container}>
									<span
										className={`${loginStyles.input_grid} ${loginStyles.width100}`}
									>
										<Field
											name="password"
											placeholder="Enter password"
											className={loginStyles.input_pass_field}
											type={isHidden ? "password" : "text"}
										/>
										<button
											type="button"
											className={loginStyles.input_pass_cta}
											onClick={() => setIsHidden((isHidden) => !isHidden)}
										>
											{isHidden ? (
												<FaEyeSlash className={loginStyles.hide_cta} />
											) : (
												<FaEye className={loginStyles.hide_cta} />
											)}
										</button>
									</span>
								</div>
								<ErrorMessage name="password" className="form-error" />
							</div>

							{error && <div className={loginStyles.inpurt_error}>{error}</div>}

							<button type="submit" className={loginStyles.form_submit_cta}>
								{isLoading ? "Logging In..." : "Login"}
							</button>
							<p
								className={`${loginStyles.form_text} ${loginStyles.marginTop1}`}
								onClick={() => {
									props.setFieldValue("email", "tester@gmail.com");
									props.setFieldValue("password", "P@ssw0rd");
								}}
							>
								<span className={loginStyles.form_links}>
									Fill Test Credentials
								</span>
							</p>

							<p
								className={`${loginStyles.form_text} ${loginStyles.marginTop1}`}
							>
								Not Registered yet?
								<span>
									<Link to="/signup" className={loginStyles.form_links}>
										Sign up
									</Link>
								</span>
							</p>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
