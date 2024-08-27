import axios from "axios";
import { Component } from "react";
import CustomCard from "./CustomCard";

// import CustomNav from "./Nav";

class CardsCategory extends Component {
  state = {
    products: [],
    categories: [],
    currentCategory: []
  };
  componentDidMount() {
    // console.log("i am executed")
    //I can call server to fetch data
    this.fetchdata();
    // this.fetchCategories()
  }
  fetchdata = async () => {
    const { status, data } = await axios.get(
      "https://fakestoreapi.com/products"
    );
    const categoryList = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    // console.log(categoryList)
    // console.log(data)
    if (status === 200) {
      this.setState({
        products: data,
        categories: categoryList.data,
      });
    }
    // console.log(this.categories)
  };
  filter = async (x) => {
    // console.log(x)
    
    const filteredData = await axios.get(
      `https://fakestoreapi.com/products/category/${x}`
    );
    // console.log(filteredData)
    
    this.setState({ products: filteredData.data});
    // console.log(this.currentCategory)

    
   
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
    
