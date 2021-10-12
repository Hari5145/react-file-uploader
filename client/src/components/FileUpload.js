import React, { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
	const [file, setFile] = useState("");
	const [filename, setFileName] = useState("Please Select the Files");
	const [uploadedFile, setUploadedFile] = useState({});

	const onChange = e => {
		setFile(e.target.files[0]);
		setFileName(e.target.files[0].name);
	};

	const onSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post("http://localhost:5000/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			if (err?.response?.status === 500) {
				console.log("There was a problem with the server");
			} else {
				console.log(err?.response?.data?.msg);
			}
			// console.log(err);
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={onSubmit}>
				<div className=" custom-file mb-3">
					<label htmlFor="customFile" className="custom-file-label">
						{filename}
					</label>
					<input
						className="custom-file-input"
						id="customFile"
						type="file"
						onChange={onChange}
					/>
				</div>

				<div className="d-grid gap-2">
					<input
						className="btn btn-primary btn-block"
						type="submit"
						value="upload"
					/>
				</div>
			</form>
			
		</React.Fragment>
	);
};

export default FileUpload;
