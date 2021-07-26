import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginStyles from "../Auth.module.css";

export const Login = () => {
	const [isHidden, setIsHidden] = useState(true);
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
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}
				>
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

						<button type="submit" className={loginStyles.form_submit_cta}>
							Login
						</button>

						<p className={`${loginStyles.form_text} ${loginStyles.marginTop1}`}>
							Not Registered yet?
							<span>
								<Link to="/signup" className={loginStyles.form_links}>
									Sign up
								</Link>
							</span>
						</p>
					</Form>
				</Formik>
			</div>
		</div>
	);
};
