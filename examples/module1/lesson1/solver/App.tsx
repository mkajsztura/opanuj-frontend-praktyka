import { useState } from 'react';
import { sum, subtract, multiply, divide } from './math-operations';
import { Input } from './Input';
import { Button } from './Button';
import { OperationResult } from './math-operations.model';

const App = () => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [result, setResult] = useState<number | string>(0);
  const [error, setError] = useState<string>('');

  const calculate = (
    mathOperation: (a: number, b: number) => OperationResult
  ) => {
    const { result, error } = mathOperation(firstNumber, secondNumber);
    setResult(result);
    setError(error || '');
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

      <div>Result: {result}</div>
      <div>{error}</div>
    </div>
  );
};

export default App;
