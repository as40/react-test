import React, { useState } from 'react';
import './App.css';

function App() {
  const [stringData, setStringData] = useState<string>("");
  const [result, setResult] = useState<number|string>("");

  const add=(numbers: string)=> {
    if (!numbers) return 0;
  
    const delimiters = /\\n|,|;/;
    if (/[^0-9,\\n,;,//]/.test(numbers)) {
      let negativeNumbers =  numbers.split(delimiters).map(num => parseInt(num.trim())).filter(num => num<0);
      if(negativeNumbers.length){
        return `Error: Negative numbers are not allowed ${negativeNumbers}.`;
      }
      return "Invalid input: Only comma, semicolon, newline separated numbers are allowed.";
    }
    const numArray = numbers.split(delimiters).map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    
    return `Result: ${numArray.reduce((sum, num) => sum + num, 0)}`;
  }

  const handleTextChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setStringData(e.target.value);
  }

  const calculate=()=>{
    setResult(add(stringData));
  }

  return (
    <div className="App">
      <div className='calculater-container shadow mx-auto'>
        <h2>String Calculator</h2>
        <p>Enter Numbers</p>
        <p data-testid="format-p-element">(Format:<span data-testid="format-span-element" className='highlight'>//[delimiter]\n[numbers]</span>)</p>
        <div><input data-testid="text-input-element" className="form-control" type="text" name="text" placeholder='E.g., //;\n1;2;3 or 1,2,3' value={stringData} onChange={handleTextChange}/></div>
        <button className='btn btn-primary' onClick={calculate}>Calculate</button>
        {result?<h3 data-testid="result-element">{result}</h3>:null}
      </div>
    </div>
  );
}

export default App;
