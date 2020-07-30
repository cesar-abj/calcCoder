import React from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

class Calculator extends React.Component{

  state = {...initialState}

  clearMemory(){
    this.setState({...initialState})
  }

  setOperation(operation){

    if (this.state.current === 0){
      this.setState({operation, current: 1, clearDisplay: true})
    } else{
      const equals = operation === '='
      const currentOperation = this.state.operation
      const values = [...this.state.values]

      try{
        //eslint-disable-next-line
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
      } catch(e){
        values[0] = this.state.values[0]
      }

      this.setState({
        displayValue: values[0],
        operation: equals? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      })
    }
  }

  addDigit(digit){
    if (digit === '.' && this.state.displayValue.includes('.')){
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + digit
    this.setState({displayValue, clearDisplay: false})

    if (digit !== '.'){
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({values})
      console.log(values);
    }
  }

  render(){

    const addDigit = digit => this.addDigit(digit)
    const setOperation = operation => this.setOperation(operation)

    return(
      <div className='calculator'>
        <Display value={this.state.displayValue}/>

        <Button click={() => this.clearMemory()} triple label='AC'/>
        <Button click={setOperation} operation label='/'/>

        <Button click={addDigit} label='7'/>
        <Button click={addDigit} label='8'/>
        <Button click={addDigit} label='9'/>
        <Button click={setOperation} operation label='*'/>

        <Button click={addDigit} label='4'/>
        <Button click={addDigit} label='5'/>
        <Button click={addDigit} label='6'/>
        <Button click={setOperation} operation label='-'/>

        <Button click={addDigit} label='1'/>
        <Button click={addDigit} label='2'/>
        <Button click={addDigit} label='3'/>
        <Button click={setOperation} operation label='+'/>

        <Button click={addDigit} double label='0'/>
        <Button click={addDigit} label='.'/>
        <Button click={setOperation} operation label='='/>
      </div>
    )
  }
}

export default Calculator