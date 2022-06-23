import { FC, useEffect, useState } from 'react';

interface Props {
	clansPerPage: number;
	totalClans: number;
	paginate: (pageNumber: number) => void;
	currentPage: string | number;
	setCurrentPage: React.Dispatch<React.SetStateAction<string | number>>;
}

export const Pagination: FC<Props> = ({
	clansPerPage,
	totalClans,
	paginate,
	currentPage,
	setCurrentPage,
}) => {
	const pageNumbers: number[] = [];
	const [arrOfCurrButtons, setArrOfCurrButtons] = useState<any[]>([]);
	for (let i = 1; i <= Math.ceil(totalClans / clansPerPage); i++) {
		pageNumbers.push(i);
	}

	useEffect(() => {
		let tempNumberOfPages = [...arrOfCurrButtons];
		let dotsInitial = '...';
		let dotsLeft = '... ';
		let dotsRight = ' ...';
		if (pageNumbers.length < 6) {
			tempNumberOfPages = pageNumbers;
		} else if (currentPage >= 1 && currentPage <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pageNumbers.length];
		} else if (currentPage === 4) {
			const sliced = pageNumbers.slice(0, 5);
			tempNumberOfPages = [...sliced, dotsInitial, pageNumbers.length];
		} else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
			const sliced1 = pageNumbers.slice(
				Number(currentPage) - 2,
				Number(currentPage)
			);
			const sliced2 = pageNumbers.slice(
				Number(currentPage),
				Number(currentPage) + 1
			);
			tempNumberOfPages = [
				1,
				dotsLeft,
				...sliced1,
				...sliced2,
				dotsRight,
				pageNumbers.length,
			];
		} else if (currentPage > pageNumbers.length - 3) {
			const sliced = pageNumbers.slice(pageNumbers.length - 4);
			tempNumberOfPages = [1, dotsLeft, ...sliced];
		} else if (currentPage === dotsInitial) {
			setCurrentPage(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
		} else if (currentPage === dotsRight) {
			setCurrentPage(arrOfCurrButtons[3] + 2);
		} else if (currentPage === dotsLeft) {
			setCurrentPage(arrOfCurrButtons[3] - 2);
		}

		setArrOfCurrButtons(tempNumberOfPages);
		setCurrentPage(currentPage);
		// eslint-disable-next-line
	}, [currentPage]);

	return (
		<nav aria-label="Page navigation example">
			<ul className="justify-content-center pagination mt-2">
				<li
					className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
					onClick={() =>
						setCurrentPage(
							currentPage === 1 ? currentPage : Number(currentPage) - 1
						)
					}
				>
					<a className="page-link" href="/#">
						Previous
					</a>
				</li>
				{arrOfCurrButtons.map((number) => (
					<li
						key={number}
						className={`page-item ${number === currentPage && 'active'}`}
						onClick={() => paginate(number)}
					>
						<a className="page-link" href="/#">
							{number}
						</a>
					</li>
				))}

				<li
					className={`page-item ${
						currentPage === pageNumbers.length ? 'disabled' : ''
					}`}
					onClick={() =>
						setCurrentPage(
							currentPage === pageNumbers.length
								? currentPage
								: Number(currentPage) + 1
						)
					}
				>
					<a className="page-link" href="/#">
						Next
					</a>
				</li>
			</ul>
		</nav>
	);
};
