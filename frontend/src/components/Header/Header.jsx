import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ setSearch }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	}

	useEffect(() => {}, [userInfo]);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Note Zipper
				</Typography>
				<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
