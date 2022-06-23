import { FC } from 'react';
import './style.css';

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	submit: (e: any) => void;
}

export const Nav: FC<Props> = ({ search, setSearch, submit }) => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<img
					className="navbar-brand"
					src="https://clashofclans.com/uploaded-images-blog/_134x63_crop_center-center_90/953396196_1639388006.png?mtime=20211213093326"
					alt="clash-of-clans"
				/>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<a className="nav-link" href="/#">
								Home <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item dropdown">
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="/#">
									Action
								</a>
								<a className="dropdown-item" href="/#">
									Another action
								</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="/#">
									Something else here
								</a>
							</div>
						</li>
					</ul>
					<form className="form-inline my-2 my-lg-0">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							className="btn btn-outline-success my-2 my-sm-0"
							type="submit"
							onClick={submit}
						>
							Search
						</button>
					</form>
				</div>
			</nav>
		</>
	);
};
