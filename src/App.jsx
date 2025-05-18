import { useState } from 'react'
import { labInputs } from './schema_lab'
import InputEl from './InputEl'

function App() {
  const [lab, setLab] = useState("trgol")

  function selectChange(e){
    setLab(e.target.value)
  }

  const inputElArray = labInputs


  return (
    <>
      <h1>Program calcul Electrotehnica</h1>
      <label for="lab">Alegeti un laborator:</label>
      <select onChange={selectChange} id="lab">
        <option value="trgol">Transformator - gol și scurtcircuit</option>
        <option value="monofaz">Monofazat în sarcină</option>
        <option value="asincr">Mașină asincronă funcţionare în sarcină, reglaj turaţie</option>
        <option value="sincr">Generator sincron funcţionând pe reţea proprie</option>
      </select>
      <br/>
      <InputEl />

    </>
  )
}
export default App
