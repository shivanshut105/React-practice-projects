const Result = (props) => {
    const formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    console.log(props.item);
    return (
        <tr>
            <td>{props.item.year}</td>
            <td>{formatter.format(props.item.savingsAtEndOfYear)}</td>
            <td>{formatter.format(props.item.yearlyInterest)}</td>
            <td>{formatter.format(props.item.savingsAtEndOfYear-props.initialInvestment-props.item.yearlyContribution*props.item.year)}</td>
            <td>{formatter.format(props.initialInvestment + props.item.yearlyContribution*props.item.year)}</td>
        </tr>
    );
}

export default Result;