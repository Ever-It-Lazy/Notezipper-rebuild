import React, { useState } from 'react'
import {
	Button,
	Box,
	FormControl,
	TextField,
	Card, CardHeader, CardContent
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown";
import { createNoteAction } from '../../actions/noteActions';
import Chance from 'chance';

const CreateNote = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noteCreate = useSelector((state) => state.noteCreate);
	const { loading, error } = noteCreate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createNoteAction({ title, content, category }));
		if (!title || !content || !category) return;

		navigate("/mynotes");
	};

	const resetHandler = () => {
		setTitle("");
		setCategory("");
		setContent("");
	};

	const chance = new Chance();

	const mockHandler = () => {
		setTitle(chance.sentence());
		setCategory(chance.word());
		setContent(chance.paragraph());
	};

	return (
		<MainScreen title="Create a Note">
			<Card>
				<CardHeader title="Create a new Note" />
				<CardContent>
					<Box component="form" onSubmit={submitHandler}>
						{error && <ErrorMessage severity="error">{error}</ErrorMessage>}

						<FormControl>
							<TextField
								label="Title"
								type="title"
								value={title}
								placeholder="Enter the title"
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</FormControl>

						<FormControl>
							<TextField
								label="Content"
								multiline={true}
								value={content}
								placeholder="Enter the Content"
								rows={4}
								onChange={(e) => setContent(e.target.value)}
								required
							/>
						</FormControl>

						{content && (
							<Card>
								<CardHeader title="Note Preview" />
								<CardContent>
									<ReactMarkdown>{content}</ReactMarkdown>
								</CardContent>
							</Card>
						)}

						<FormControl>
							<TextField
								label="Category"
								type="category"
								value={category}
								placeholder="Enter the Category"
								onChange={(e) => setCategory(e.target.value)}
								required
							/>
						</FormControl>

						{loading && <Loading size={50} />}

						<Button type="submit" sx={{ marginRight: "10px" }}>
							Create Note
						</Button>
						<Button color="secondary" sx={{ marginRight: "10px" }} onClick={mockHandler}>
							Mock Data
						</Button>
						<Button color="warning" onClick={resetHandler}>
							Reset Fields
						</Button>
					</Box>
				</CardContent>

				<footer>
					Creating on - {new Date().toLocaleDateString()}
				</footer>
			</Card>
		</MainScreen>
	)
}

export default CreateNote;
