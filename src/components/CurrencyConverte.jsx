// import { wait } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import '../css/CurrencyConverter.css'

 
 const CurrencyConvertor = () => {

    const [currencies, setCurrencies] = useState([])
    const [fromCurrency,setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [amount, setAmount] = useState("1");
    const [result,setResult] = useState();
    

    const getCurrencies = async() =>{
        const res = await fetch(`https://api.frankfurter.dev/v1/currencies`);
        const data = await res.json();
 
        setCurrencies(Object.keys(data))
        
    }

    useEffect(()=>{
        getCurrencies()
    },[])

    const handleFromCurrencies = (e) =>{
        console.log(e.target.value);
        setFromCurrency(e.target.value)
        
    }

    const handleToCurrencies = (e) =>{
        console.log(e.target.value);
        setToCurrency(e.target.value)
        
    }

    const handleAmount = (e) =>{
        console.log(e.target.value);
        setAmount(e.target.value)
        
    }

    const convertCurrency = async()=>{
        const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromCurrency}&symbols=${toCurrency}`);
        const data = await res.json();
        console.log(data.rates[toCurrency]);
        setResult("Converted Amount : "+data.rates[toCurrency]+" "+toCurrency)
        
    }
    console.log(result);
    
   return (
     <div className='container'>
     <p className="heading">Currency Convertor</p>
        <div className='select'>
            <div>
                <p>From</p>
                <select value={fromCurrency} onChange={handleFromCurrencies}>
                {currencies.map((curVal, index)=>{
                    
                    return(
                        
                        <option value={curVal}>{curVal}</option>
                    )
                })}
                     
                </select>
            </div>

            <div>
                <p>To</p>
                <select value={toCurrency} onChange={handleToCurrencies}>
                {currencies.map((curVal, index)=>{
                    
                    return(
                        
                        <option value={curVal}>{curVal}</option>
                    )
                })}
                     
                </select>
            </div>
        </div>

        <div className='amountContainer'>
            <p>Amount</p>
            <input type='number' value={amount} placeholder='Enter Amount' onChange={handleAmount}/>
        </div>

        <div className='convertBtn'>
            <button onClick={convertCurrency}>Convert</button>
        </div>

        <div className="result">
          <p>{result}</p>
        </div>
     </div>
   )
 }
 
 export default CurrencyConvertor


