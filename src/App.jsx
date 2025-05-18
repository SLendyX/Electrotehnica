import { useState } from 'react'
import { labInputs } from './schema_lab'
import InputEl from './InputEl'

function App() {
  const [lab, setLab] = useState("trgol")

  function selectChange(e){
    setLab(e.target.value)
  }

  const inputElArray = labInputs[lab].map(object =>{
    const {name, label, type, value} = object
    return <InputEl name={`${lab}_${name}`} label={label} type={type} value={value}/>
  })


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
      <br/><br/>
      <div className='input-container'>
        {...inputElArray}
      </div>

    </>
  )
}
export default App
