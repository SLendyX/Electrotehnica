import { useState } from 'react'
import { labInputs } from './schema_lab'
import InputEl from './InputEl'
import Rezultate from './Rezultate'
import Plot from 'react-plotly.js'

function App() {
  const [lab, setLab] = useState("trgol")
  const [labArray, setLabArray] = useState({labInputs})
  const [data, setData] = useState({})

  const numberRegex = /[^0-9,. ]/g

  function selectChange(e){
    setLab(e.target.value)
  }

  function updateInputs(e){
    const value = e.target.value

    if(typeof value === "string" && value.match(numberRegex) !== null){
      return
    }

    const [category, name] = e.target.id.split("_")
    
    setLabArray(oldLabArray => {
      const updatedCategory = oldLabArray.labInputs[category].map(object => {
        if(object.name === name){
          if(typeof value !== "string")
            object.value = value
          else if(value.includes("."))
            object.value = Number(value)
          else
            object.value = value.split(",").map(string => {
              if(string !== "")
                return Number(string)
            })

        }

        return object
      })
      oldLabArray[category] = [...updatedCategory]

      return {...oldLabArray}
    })
    
  }

  const inputElArray = labArray.labInputs[lab].map(object =>{
    const {name, label, type, value} = object
    return <InputEl name={`${lab}_${name}`} label={label} type={type} value={value} onChange={updateInputs}/>
  })

  console.log(labArray.labInputs[lab])
  console.log(data)

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

      <Rezultate inputArray={labArray.labInputs[lab]} category={lab} setData={setData}/>

      <Plot
        data={[
        {
          x: data.x2,
          y: data.y2,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue' },
        },
        {
          x: data.x2,
          y: data.y2,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'orange' },
        },
      ]}
      layout={{
        width: '100%',
        height: 800,
        title: { text: 'Graficul' },
        xaxis: {
          title: {
            text: 'E (V)',       
            font: { size: 14 },
          },
        },
        yaxis: {
          title: {
            text: 'Iₑ (A)',      
            font: { size: 14 },
          },
        },
        legend: { orientation: 'h', x: 0.5, xanchor: 'center' },
      }}
    />

    </>
  )
}
export default App
