import './App.css'
import Display from "./components/Display.tsx";
import {useProductData} from "./data/api.ts";
import AddProductForm from "./components/AddProductForm.tsx";

function App() {

    //const data = [{id: 1, name: "Product 1", description: "This is a product", price: 100}];
    const { data } = useProductData();

  return (
    <>
        <Display products={data || []}/>
        <AddProductForm />
    </>
  )
}

export default App
