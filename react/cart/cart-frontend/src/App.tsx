import './App.css'
import Display from "./components/Display.tsx";
import {useProductData} from "./data/api.ts";

function App() {

    //const data = [{id: 1, name: "Product 1", description: "This is a product", price: 100}];
    const { data } = useProductData();

  return (
    <>
        <Display products={data || []}/>
    </>
  )
}

export default App
