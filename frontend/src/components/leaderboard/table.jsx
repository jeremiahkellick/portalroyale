import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount() {
        this.props.fetchStats();
    }
    render() {
        const leaderboard = this.props.leaderboard;
        let counter = 0;
        return (
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr className='leaderboard-title'>
                            <td className='column-rank'>RANK</td>
                            <td className='player-column'>PLAYER</td>
                            <td className='column-stat'>KILLS</td>
                            {/* <td className='column-stat'>DAMAGES</td> */}
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map (el => 
                            <tr key={counter}>
                                <td>#{counter += 1}</td>
                                <td className='player-name player-column'>{el.name}</td>
                                <td>{el.kills}</td>
                                {/* <td>{el.damage_dealt}</td> */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;