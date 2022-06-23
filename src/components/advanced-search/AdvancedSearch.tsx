import axios from 'axios';
import { FC, useState } from 'react';
import './style.css';

interface Props {
	clans: any[];
	setClans: React.Dispatch<React.SetStateAction<any[]>>;
	search: string;
	API_KEY: string;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdvancedSearch: FC<Props> = ({
	clans,
	setClans,
	search,
	API_KEY,
	setLoading,
}) => {
	const [advanced, setAdvanced] = useState<boolean>(false);
	const [input, setInput] = useState<string>('');
	const [select, setSelect] = useState<string>('');

	const onChange = async (e: any) => {
		setLoading(true);
		setSelect(e.target.value);
		setClans([]);
		try {
			const { data: response } = await axios.get(
				`/clans?name=${search}&warFrequency=${e.target.value}${
					input ? '&minClanPoints=' + input : ''
				}`,
				{
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
					},
				}
			);
			setClans(response.items);
		} catch (error: any) {
			console.error(error.message);
		}
		setLoading(false);
	};

	const inputOnchange = async (e: any) => {
		setInput(e.target.value);
		setClans([]);
		try {
			const { data: response } = await axios.get(
				`/clans?name=${search}${
					select ? '&warFrequency=' + select : ''
				}&minClanPoints=${e.target.value}`,
				{
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
					},
				}
			);
			setClans(response.items);
		} catch (error: any) {
			console.error(error.message);
		}
	};
	return (
		<div className="advanced-search w-100 d-flex align-items-center p-1 flex-column text-light">
			<div className=" w-100 d-flex align-items-center justify-content-center">
				<h5
					className="cursor-pointer my-2"
					onClick={() => setAdvanced(!advanced)}
				>
					Advanced Search
				</h5>
				{advanced ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-arrow-down"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="bi bi-arrow-right-short"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
						/>
					</svg>
				)}
			</div>
			{advanced && (
				<div className="d-flex flex-column ml-4">
					<div className="d-flex align-center justify-content-center">
						<label className="mr-1">War Frequency: </label>
						<select
							className="form-select form-select-lg mb-2 p-1"
							aria-label=".form-select-lg example"
							disabled={clans.length === 0}
							onChange={onChange}
							defaultValue=""
						>
							<option value="" disabled>
								Open this select menu
							</option>
							<option value="unknown">Unknown</option>
							<option value="always">Always</option>
							<option value="lessThanOncePerWeek">
								Less Than Once Per Week
							</option>
						</select>
					</div>
					<div className="d-flex align-center">
						<label className="mr-1">Minimun clan points: </label>
						<select
							className="form-select form-select-lg mb-2 p-1"
							aria-label=".form-select-lg example"
							disabled={clans.length === 0}
							onChange={inputOnchange}
							defaultValue=""
						>
							<option value="" disabled>
								Open this select menu
							</option>
							<option value="1000">1000</option>
							<option value="2000">2000</option>
							<option value="3000">3000</option>
							<option value="4000">4000</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
};
