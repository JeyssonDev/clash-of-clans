import { FC } from 'react';
import { Item } from '../item/Item';
import ReactLoading from 'react-loading';

interface Props {
	clans: any[];
	loading: boolean;
}

export const Items: FC<Props> = ({ clans, loading }) => {
	return (
		<div className="d-flex flex-column">
			{loading ? (
				<div className="d-flex justify-content-center">
					<ReactLoading type={'spin'} color={'blue'} height={200} width={100} />
				</div>
			) : clans.length === 0 ? (
				<p className="text-center mt-5">No items to show</p>
			) : (
				clans.map((clan, idx) => (
					<Item
						key={idx}
						name={clan.name}
						badge={clan.badgeUrls.small}
						clanPoints={clan.clanPoints}
						members={clan.members}
						type={clan.type}
						tag={clan.tag}
					/>
				))
			)}
		</div>
	);
};
