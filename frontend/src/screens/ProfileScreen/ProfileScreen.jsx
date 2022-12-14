import React, { useEffect, useState } from 'react'
import { Button, Box, FormControl, TextField } from '@mui/material';
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';
import "./ProfileScreen.css";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [picMessage, setPicMessage] = useState("");
	const [error, setError] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success } = userUpdate;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setPic(userInfo.pic);
			setError(userUpdate.error);
		} else {
			navigate("/");
		}
	}, [userInfo, navigate, userUpdate]);


	const submitHandler = async (e) => {
		e.preventDefault();

		if (password === confirmPassword) {
			setError("");
			dispatch(updateProfile({ name, pic, email, password }));
		} else {
			setError("Both password fields must match");
		}
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please select an image");
		}
		setPicMessage(null);

		if (pics.type === "image/png" || pics.type === "image/jpeg") {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'notezipper');
			data.append('cloud_name', 'dnymu8b28');
			fetch('https://api.cloudinary.com/v1_1/dnymu8b28/image/upload', {
				method: 'post',
				body: data
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});

		} else {
			return setPicMessage("Please select an image");
		}
	};

	return (
		<MainScreen title="Edit Profile">
			<div className="profileContainer">
				<>
					<>
						<Box component="form" onSubmit={submitHandler}>
							{loading && <Loading />}
							{success && (
								<ErrorMessage severity="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{error && error.length > 0 && <ErrorMessage severity="error">{error}</ErrorMessage>}
							<FormControl>
								<TextField
									label="Name"
									id="name"
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FormControl>

							<FormControl>
								<TextField
									label="Email Address"
									id="email"
									type="email"
									placeholder="Enter Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>

							<FormControl>
								<TextField
									label="Password"
									id="password"
									type="password"
									placeholder="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>

							<FormControl>
								<TextField
									label="Confirm Password"
									id="confirmPassword"
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</FormControl>

							{picMessage && (
								<ErrorMessage severity="error">{picMessage}</ErrorMessage>
							)}

							<FormControl>
								<TextField
									id="pic"
									type="file"
									onChange={(e) => postDetails(e.target.files[0])}
								/>
							</FormControl>

							<Button type="submit">
								Update
							</Button>
						</Box>
					</>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<img src={pic} alt={name} style={{width: '20vw'}} className="profilePic" />
					</Box>
				</>
			</div>
		</MainScreen>
	)
}

export default ProfileScreen;
