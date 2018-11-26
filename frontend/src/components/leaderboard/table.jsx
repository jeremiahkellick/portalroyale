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
            <div className="leaderboard">
                <h1>LEADERBOARD</h1>
                <table>
                    <thead>
                        <tr>
                            <td>RANK</td>
                            <td>PLAYER</td>
                            <td>KILLS</td>
                            <td>DAMAGES</td>
                        </tr>
                    </thead>
                    {leaderboard.map (el => 
                        <tbody>
                            <tr>
                                <td>{counter += 1}</td>
                                <td>{el.name}</td>
                                <td>{el.kills}</td>
                                <td>{el.damage_dealt}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        );
    }
}

export default Table;