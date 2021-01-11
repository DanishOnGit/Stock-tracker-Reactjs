import React, { useState } from "react";
import "./styles.css";

var price,quantity;

var output,stockprice;
let apiKey="0QVW1DBC4JJ5LAG7";


export default function App() {
  const[finalOutput,setFinalOutput]=useState("")

  function clickHandler(){
    let stockName=document.getElementById("stockName").value

    console.log(stockName)
    if(stockName){
      console.log("exists")
    }else{
      console.log("not exist")
    }
    fetch(urlHandler(stockName))

    .then(res=>res.json())

    .then(json=>{
      output=json["Global Quote"];
      stockprice=output["05. price"];
      var detailsArray= getDetails();
     console.log(detailsArray);
detailsArray.forEach(key=>{
let showOutput= output[key]
console.log(showOutput)
document.getElementById("stockDetail").innerText=showOutput
})
      

    })
    .catch(err=>{
          console.log(err);
    })

    }


  function urlHandler(name){
    return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + name + "&apikey=" + apiKey;
  }
  function getDetails(){
return Object.keys(output)
  }











  return (
    <div className="App">
      <h1>Stock Tracker</h1>

      <section>
        <p>Select Stock</p>
        <select name="stock-options" id="stockName">
        <option value="NFLX">Netflix - NFLX</option>
        <option value="GOOGL">Google - GOOGL</option>
        <option value="MSFT">Microsoft - MSFT</option>
        <option value="TSLA">Tesla - TSLA</option>
        <option value="AMD">Advanced Micro Devices - AMD</option>
        <option value="INTC">Intel - INTC</option>
        <option value="NVDA">Nvidia - NVDA</option>
        <option value="AAPL">Apple - AAPL</option>
        <option value="AMZN">Amazon - AMZN</option>
  
        </select>
        <div><p>Enter Buy Price</p>
        <input onChange={(e)=>price=e.target.value} type="number" id="price"/></div>
        <div><p>Enter Quantity</p>
        <input onChange={(e)=>quantity=e.target.value} type="number" id="quant"/></div>
        <button id="checkBtn" onClick={clickHandler}>Check</button>
      </section>
<hr/>
<section>
<div>
  <p>Profit/Loss</p>
  <div id="absValue"></div>
  </div>
  <div>
  <p>% Profit/Loss</p>
  <div id="percentValue"></div>
  </div>
  <div>
  <p>Stock details</p>
  <div id="stockDetail">{finalOutput}</div>
  </div>
</section>
    </div>
  );
}



// `Current price:$ ${detailsArray[0]} \n Change: ${detailsArray[1]}`

// output["05. price"],output["09. change"]