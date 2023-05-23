import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'utils/Api';
// import { testList } from 'utils/testList';

const Welcome = () => {
	const navigate = useNavigate();
	const [messages, setMessages] = useState([]);
	const [limiter, setLimiter] = useState(10);
	const [seeMore, setSeeMore] = useState(true);

	const handleButton = useCallback(() => {
		navigate('/message');
	}, []);

	const handleButtonMore = useCallback(() => {
		setLimiter(limiter + 1);
	}, []);

	useEffect(() => {
		api
			.getMessages()
			.then((res) => {
				setMessages([...messages, ...res.data.reverse()]);
			})
			.catch((err) => console.log('err: ', err));
	}, []);

	useEffect(() => {
		messages.length <= limiter && setSeeMore(false);
	}, [messages, limiter, seeMore]);

	return (
		<section className='welcome'>
			<h1 className='welcome__title'>GuestBook</h1>
			<p className='welcome__text'>
				See what people wrote about us and feel free to leave a message.
			</p>
			{messages.length > 0 
				? <div className='welcome__messages'>
				{messages.map((item, i) => {
					while (i < limiter) {
						return (
							<div className='message__item' key={i}>
								<h3 className='message__item-name'>{item.name}:</h3>
								<p className='message__item-mes'>{item.message}</p>
							</div>
						);
					}
				})}
			</div>
				: <p className='welcome__no-mes'>There are no messages yet.....</p>
			
			}
			
			<button type='button' className='welcome__btn' onClick={handleButton}>
				Leave a message
			</button>
			<button
				disabled={!seeMore}
				type='button'
				className='welcome__btn-more'
				onClick={handleButtonMore}
				style={{
					cursor: seeMore ? 'pointer' : 'not-allowed',
				}}
			>
				See more
			</button>
		</section>
	);
};

export default Welcome;
