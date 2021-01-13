import React, { useState } from "react";
import "./styles.css";
import invest from "./undraw.svg"

var buyprice,quantity;
let profitOrLoss,perProfitOrLoss;
var mainColor="rgba(128, 115, 0, 0.301)";


var output,currentprice;
let apiKey="0QVW1DBC4JJ5LAG7";


export default function App() {
  const[finalOutput,setFinalOutput]=useState("")

  function clickHandler(e){
    e.preventDefault();
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
      currentprice=output["05. price"];
     calculator(currentprice,buyprice)
      
var showOutput=<div>
<ul>
  <li>Current price:{parseFloat(output["05. price"]).toFixed(2)}</li>
  <li>High:{parseFloat(output["03. high"]).toFixed(2)}</li>
<li>Low:{parseFloat(output["04. low"]).toFixed(2)}</li>
</ul>
</div>
setFinalOutput(showOutput)
    
 })
   .catch(err=>{
          console.log(err);
    })

    }


  function urlHandler(name){
    return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + name + "&apikey=" + apiKey;
  }

  function calculator(present,initial){
     let nosPresent=Number(present);
     let nosInitial=Number(initial);
     let nosQuantity=Number(quantity);
if(initial===undefined || quantity===undefined){
document.getElementById("absValue").innerText="Please fill  all above fields."
document.getElementById("percentValue").innerText="Please fill  all above fields."
}else{
    profitOrLoss=parseFloat((nosQuantity* nosPresent)- (nosQuantity* nosInitial)).toFixed(2);
    console.log(profitOrLoss);
    perProfitOrLoss=(profitOrLoss/(nosQuantity* nosInitial) *100).toFixed(2)
    console.log(perProfitOrLoss)
}
console.log(typeof(profitOrLoss))
if(Number(profitOrLoss)===0){
  document.getElementById("absValue").innerText="No Profit/Loss"
document.getElementById("percentValue").innerText="No Profit/Loss"

}else if(Number(profitOrLoss)>0){
  document.getElementById("absValue").innerText=`$${profitOrLoss} profit`;
  document.getElementById("percentValue").innerText=` ${perProfitOrLoss} % profit`
   if(Number(perProfitOrLoss)>50){
     document.getElementById("container").style.backgroundColor="lightgreen"
   }
   else{
    document.getElementById("container").style.backgroundColor=`${mainColor}`

   }
}else if(Number(profitOrLoss)<0){
  document.getElementById("absValue").innerText=`$${Math.abs(profitOrLoss)} loss`;
  document.getElementById("percentValue").innerText=` ${Math.abs(perProfitOrLoss)} % loss`
  if(Number(perProfitOrLoss)<(-50)){
    document.getElementById("container").style.backgroundColor="lightcoral"
  }
  else{
    document.getElementById("container").style.backgroundColor=`${mainColor}`

  }

}

}

  




  return (
    <div className="App" id="container">
      <h1>Stock Tracker</h1>
      <div><img src={invest} alt="chartimage" style={{width:"200px",height:"100px"}} /></div>

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
        <option value="ACIA">Acacia Communications Inc	ACIA</option>
  
        </select>
        <form method="GET" onSubmit={clickHandler}>
<div>
<label className="labels">Enter purchase price</label><br/>
<input onChange={(e)=>buyprice=e.target.value} type="number" min="0.001" step="0.0001"/>
</div>
<div>
<label className="labels">Enter Quantity</label><br/>
<input onChange={(e)=>quantity=e.target.value} type="number" min="0" />
</div>
<button type="submit" className="checkBtn">Check</button>

</form>
         {/* <div><p>Enter Purchasing Price</p>
        <input onChange={(e)=>buyprice=e.target.value} type="number" min="1" id="price"/></div>
        <div><p>Enter Quantity</p>
        <input onChange={(e)=>quantity=e.target.value} type="number" min="1" id="quant"/></div>
        <button id="checkBtn" onClick={clickHandler}>Check</button>  */}
      </section>
<hr/>
<section>
<div>
  <p>Profit/Loss</p>
  <div >
    <p id="absValue"></p>
  </div>
  </div>
  <div>
  <p>% Profit/Loss</p>
  <div>
    <p id="percentValue" ></p>
    
  </div>
  </div>
  <div>
  <p>Stock details</p>
  <div id="stockDetail">{finalOutput}</div>
  </div>
</section>
    </div>
  );
}



