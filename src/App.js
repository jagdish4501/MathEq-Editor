import './App.css'
import '//unpkg.com/mathlive'
import { useState, useRef, useEffect } from 'react'

// Use &#123; and &#125; to escape { and } in JSX

function App() {
  const [value, setValue] = useState('')
  const[show,setShow]=useState(false)
  const [msg,setMsg]=useState('');

  // Customize the mathfield when it is mounted
  const mf = useRef()
  useEffect(() => {
    mf.current.smartFence = true
    mf.current.addEventListener('input', (evt) => {
      if (evt.inputType === 'insertLineBreak') {
        evt.target.executeCommand('plonk')
      }
    })
  }, [])

  // Update the mathfield when the value changes
  useEffect(() => {
    mf.current.value = value
  }, [value])



  return (
    <div className='App'>
      <h1 style={{color:'white'}}>MathEQ Editor</h1>
        <math-field ref={mf} onInput={(evt) => setValue(evt.target.value)} >
          {value}
        </math-field>
      {value!==''?<>
      <div className='LateX'> 
        {value}
      </div>
        <button className='bn30' onClick={async()=>{
          setShow(true);
          setTimeout(()=>{setShow(false)},2000)
          try{
            await navigator.clipboard.writeText(value);
            setMsg('copied to clipboard')
            }catch(err){
              setMsg('unable to copy')
            }
          }
          }>copy LateX</button>
      </>
      :<></>
      }
      {
        show?
        <p style={{color:'white'}}>
          {msg}
        </p>:<></>
      }
      
    </div>
  )
}

export default App
