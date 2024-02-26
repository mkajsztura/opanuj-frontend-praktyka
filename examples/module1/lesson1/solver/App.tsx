import { useState } from 'react';
import { sum, subtract, multiply, divide } from './functions';
import { Input } from './Input';
import { Button } from './Button';

const App = () => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [Result, setResult] = useState<number | string>(0);

  const calculate = (mathOperation: (a: number, b: number) => number) => {
    setResult(mathOperation(firstNumber, secondNumber));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <Input
          value={firstNumber}
          onChange={({ target }) => setFirstNumber(Number(target.value))}
        />
        <Input
          value={secondNumber}
          onChange={({ target }) => setSecondNumber(Number(target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4 my-4">
        <Button onClick={() => calculate(sum)}>+</Button>
        <Button onClick={() => calculate(subtract)}>-</Button>

        <Button onClick={() => calculate(multiply)}>*</Button>

        <Button onClick={() => calculate(divide)}>/</Button>
      </div>
      <div>Result: {Result}</div>
    </div>
  );
};

export default App;
