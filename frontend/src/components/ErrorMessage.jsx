import React from 'react';
import Alert from '@mui/material/Alert';

const ErrorMessage = ({ severity = "info", children }) => {
	return (
		<Alert severity={severity} sx={{ fontSize: 20 }}>
			<strong>{children}</strong>
		</Alert>
	)
};

export default ErrorMessage;
