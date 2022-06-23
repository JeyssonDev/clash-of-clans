import { useState } from 'react';
import { FC } from 'react';
import axios from 'axios';
import { Nav, Items, Pagination, Banner, AdvancedSearch } from '../components';

const Home: FC = () => {
	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [clans, setClans] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState<number | string>(1);
	const clansPerPage = 5;
	const indexOfLastClans = Number(currentPage) * clansPerPage;
	const indexOfFirstClans = indexOfLastClans - clansPerPage;
	const currentClans = clans.slice(indexOfFirstClans, indexOfLastClans);

	const API_KEY =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQyOWRhZGVjLWJiYWEtNDY5Yy1hOTA0LWZiMzg0M2RiY2JhNCIsImlhdCI6MTY1NTg2OTM0Nywic3ViIjoiZGV2ZWxvcGVyL2U0OTNmZDY4LWU5OTUtMDljNi1iMTlkLWY5MTZjMGRiMmQyNyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Ni44MC41NC44MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.gpgk__qiPCDlRoV4DEyzEGtKcpaVJ8dkMntfkI04yg2VHmEtuzz_uuMAWveo4F0KhqsBbQ89i9FH6yioX20zQA';

	const submit = async (e: any) => {
		setLoading(true);
		setClans([]);
		e.preventDefault();
		try {
			const { data: response } = await axios.get(`/clans?name=${search}`, {
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			});
			setClans(response.items);
		} catch (error: any) {
			console.error(error.message);
		}
		setLoading(false);
	};

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div>
			<Nav search={search} setSearch={setSearch} submit={submit} />
			<Banner />
			<AdvancedSearch
				clans={clans}
				setClans={setClans}
				search={search}
				API_KEY={API_KEY}
				setLoading={setLoading}
			/>
			<Items loading={loading} clans={currentClans} />
			{clans.length > 0 && (
				<Pagination
					clansPerPage={clansPerPage}
					totalClans={clans.length}
					paginate={paginate}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
};

export default Home;
