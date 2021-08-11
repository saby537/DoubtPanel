import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../../FormElements/Button/Button';

const ErrorModal = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header="An Error Occurred!"
			show={!!props.error}
			footer={<Button onClick={props.onClear}>Okay</Button>}
		>
			{props.error.length > 0 &&
				props.error.map((err, id) => {
					let msg = err;
					if (err.message !== undefined) {
						msg = err.message;
					}
					return <p key={id}>{msg}</p>;
				})}
		</Modal>
	);
};

export default ErrorModal;
