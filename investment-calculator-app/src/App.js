import { useState } from "react";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import UserInputs from "./components/UserInputs/UserInputs";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  }


  const yearlyData = [];

  if (userInput) {

    let currentSavings = userInput['current-savings'];
    const yearlyContribution = userInput['yearly-contribution'];
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      yearlyData.push(
        {
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsAtEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution,
        }
      )
    }
  }

  return (
    <div>
      <Header />
      <UserInputs onCalculation={calculateHandler}/>
      {
        userInput ? <ResultsTable initialInvestment={userInput['current-savings']} data={yearlyData} /> : <p style={{textAlign: 'center'}}>No investment calculated yet.</p>
      }
    </div>
  );
}

export default App;
