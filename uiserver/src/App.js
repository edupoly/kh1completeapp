
import './App.css';
import Restaurants from './Restaurants';

function App() {
  function abc(){
    fetch("http://localhost:5500/something")
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
  }
  return (
    <div>
     <button onClick={abc}>Example session</button>

     <Restaurants></Restaurants>
    </div>
  );
}

export default App;
