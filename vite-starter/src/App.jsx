import React from "react";
import "./App.css";


function App() {
  const [buttonColor, setButtonColor] = React.useState("medium-violet-red");
  const nextColor = buttonColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsButtonDisabled(prevState => !prevState);
  }

  return (
    <div>
      <button className={`${buttonColor} ${isButtonDisabled ? 'disabled' : ''}`} onClick={() => setButtonColor(nextColor)} disabled={isButtonDisabled}>Change to {nextColor}</button>
      <br />
      <input type="checkbox" id="disable-button-checkbox" defaultChecked={false} onChange={handleCheckboxChange} />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
