import { FC } from 'react';
import './styles.css';

interface Props {
	name: string;
	tag: string;
	type: string;
	badge: string;
	members: number;
	clanPoints: number;
}

export const Item: FC<Props> = ({
	name,
	tag,
	type,
	badge,
	members,
	clanPoints,
}) => {
	return (
		<div className="item d-flex justify-content-around align-items-center w-100">
			<div className="left d-flex align-items-center justify-content-center">
				<img src={badge} alt="bagde-url" className="badge mr-3" />
				<div>
					<h5>{name}</h5>
					<div className="text-secondary">
						<span>{tag}</span> | <span>{type}</span>
					</div>
				</div>
			</div>
			<div className="right d-flex align-items-center text-center">
				<div className="d-flex flex-column mr-3">
					<h6 className="text-secondary">Members:</h6>
					<span className="members text-center rounded">{members}</span>
				</div>
				<div className="trophy rounded d-flex p-2">
					<span className="mr-2 text-light">{clanPoints}</span>
					<img
						src="https://clashofclans.com/blog-assets/img/clan-search/trophy.png"
						alt="trophy"
						className="trophy-img"
					/>
				</div>
			</div>
		</div>
	);
};
