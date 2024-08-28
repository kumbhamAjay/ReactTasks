import axios from "axios";
import { Component } from "react";
import CustomCard from "./CustomCard";



class CardsCategory extends Component {
  state = {
    products: [],
    categories: [],
    currentCategory: []
  };
  componentDidMount() {
    
    this.fetchdata();
    
  }
  fetchdata = async () => {
    const { status, data } = await axios.get(
      "https://fakestoreapi.com/products"
    );
    const categoryList = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
  
    if (status === 200) {
      this.setState({
        products: data,
        categories: categoryList.data,
      });
    }
    
  };
  filter = async (x) => {

    
    const filteredData = await axios.get(
      `https://fakestoreapi.com/products/category/${x}`
    );
   
    
    this.setState({ products: filteredData.data});
  

    
   
  };

  render() {
    return (
      <>
        <h1>Categories</h1>

        {this.state.categories.map((each) => {
          return (
            <button onClick={()=>{this.filter(each)}} key={each}>
              {each}
            </button>
          );
        })}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

          {this.state.products.map((each) => {
            return (
              <div key={each.id} style={{ height: "800px" }}>
                <CustomCard
                  title={each.title}
                  text={each.description}
                  price={each.price}
                  image={each.image}
                />
                
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default CardsCategory 
    
