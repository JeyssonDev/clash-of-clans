import { FC } from 'react';
import './style.css';

export const Banner: FC = () => {
	return (
		<div className="d-flex banner p-4">
			<h3 className="d-block align-self-end text-light">Clan search</h3>
		</div>
	);
};
