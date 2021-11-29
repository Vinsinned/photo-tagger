import React from 'react';

function Leaderboard(props) {
	const { array } = props;
	if (array.length !== 0) {
		const leaderboard = document.querySelector('#leaderboard');
		leaderboard.classList.remove('hide');
	}
	return (
		<div lang="en" id="leaderboard" className="hide">
			<h2>Leaderboard</h2>
			<table id="scores">
				{array.map(doc => {
					return <tbody key={doc['name'] + doc['time']}>
						<tr>
							<td className="name">{doc['name']}</td>
							<td>{doc['time'].substring(0, 2) + '.' + doc['time'].substring(2, doc['time'].length) + 's'}</td>
						</tr>
					</tbody>
				})}
			</table>
		</div>
	);
}

export default Leaderboard;