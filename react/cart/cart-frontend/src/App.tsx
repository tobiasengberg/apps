import './App.css'
import Display from "./components/Display.tsx";
import {useProductData} from "./data/api.ts";
import AddProductForm from "./components/AddProductForm.tsx";

function App() {

    //const data = [{id: 1, name: "Product 1", description: "This is a product", price: 100}];
    const { data } = useProductData();

  return (
    <div className="grid grid-cols-5 gap-4">
        <div>
            <AddProductForm />
        </div>
        <div className="col-span-4 p-2">
            <Display products={data || []}/>
        </div>
    </div>
  )
}

export default App
