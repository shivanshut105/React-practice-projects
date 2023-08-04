import Result from "./Result";

const ResultsTable = (props) => {
    return (
        <table className="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((saving) => {
                    return <Result
                        initialInvestment={props.initialInvestment}
                        item={saving}
                        key={saving.year} />
                })}
            </tbody>
        </table>);
}

export default ResultsTable;