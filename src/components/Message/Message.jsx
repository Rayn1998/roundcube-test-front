import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from 'utils/Api';

const Message = () => {
	const navigate = useNavigate();
	const [buttonStatus, setButtonStatus] = useState(false);
	const [messageEnable, setMessageEnable] = useState(false);
	const [messageText, setMessageText] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const setSubmit = useCallback((data) => {
		setMessageEnable(true);
		setMessageText('Sending...');
		api.sendMessage(data)
			.then(() => {
				setMessageText('Message sent!))), now go back')
				setButtonStatus(true);
			})
			.catch(() => {
				setMessageText('Sending failed :(((');
			});
	}, []);

	const handleClick = useCallback(() => {
    navigate(-1);
  }, [])

	return (
		<section className='message'>
			<button className='message__back' onClick={handleClick}>Go back</button>
			<form onSubmit={handleSubmit(setSubmit)} className='message__form'>
				<div className='message__field-wrapper'>
					<p className='message__field-name'>Name: </p>
					<input
						className='message__field-input'
						{...register('name', {
							required: 'Name is required!',
							minLength: {
								value: 3,
								message: 'Minimum length for name is 3 symbols!',
							},
							maxLength: {
								value: 12,
								message: 'Minimum length for name is 12 symbols!',
							}
						})}
					/>
				</div>
				{errors.name && (
					<p className='message__field-error'>{errors.name.message}</p>
				)}
				<div className='message__field-wrapper'>
					<p className='message__field-name'>Message: </p>
					<input 
            className='message__field-input' 
            {...register('message', {
							required: 'Message is required!',
							minLength: {
								value: 5,
								message: 'Minimum length for message is 5 symbols!',
							},
						})}
          />
				</div>
				{errors.message && (
					<p className='message__field-error'>{errors.message.message}</p>
				)}
				<button 
					disabled={buttonStatus} 
					className='message__post-btn'
					style={{
						cursor: buttonStatus ? 'not-allowed' : 'pointer',
					}}
				>Post</button>
				{messageEnable && <p className='message__post-btn-status'>{messageText}</p>}
			</form>
		</section>
	);
};

export default Message;
