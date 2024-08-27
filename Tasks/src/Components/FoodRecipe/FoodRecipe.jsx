import axios from "axios";
import { Component } from "react";
import "./Foodrecepi.css";
class FoodRecipe extends Component {
  state = {
    recepie: [],

    styles: [],
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const { status, data } = await axios.get("https://dummyjson.com/recipes");
    if (status == 200) {
      this.setState(
        {
          recepie: data.recipes,
          styles: data.recipes.map(() => {
            return {
              text: { height: "350px" },
              instructions: { display: "none" },
              show: true,
              buttonText: "Show More",
            };
          }),
        },
        () => {
          // console.log(this.state.styles)
        }
      );
    }
  };
  handleclick = (index) => {
    this.setState(
      {
        styles: this.state.styles.map((key, i) => {
          if (i == index) {
            if (key.show) {
              return {
                text: { height: "700px" },
                instructions: { display: "block" },
                show: false,
                buttonText: "Show Less",
              };
            } else {
              return {
                text: { height: "350px" },
                instructions: { display: "none" },
                show: true,
                buttonText: "Show More",
              };
            }
          } else {
            return key;
          }
        }),
      },
      () => {
        // console.log(this.state.styles)
      }
    );
  };
  render() {
    return (
      <>
        <h1>Recepie Listing</h1>
        <div className="card-container">
          {this.state.recepie.map((each, ind) => {
            // console.log(this.state.styles[ind].text);
            return (
              <div
                key={ind}
                className="card"
                style={this.state.styles[ind].text}
              >
                <div className="title">
                  <h3>{each.name}</h3>
                </div>

                <div className="image">
                  <img src={each.image} alt="" />
                </div>
                <div className="text">
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <p>{each.ingredients}</p>
                  </div>
                  <div
                    className="Instructions"
                    style={this.state.styles[ind].instructions}
                  >
                    <h3>Instructions</h3>
                    <p>{each.instructions}</p>
                  </div>
                </div>
                <button onClick={() => this.handleclick(ind)}>
                  {this.state.styles[ind].buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default FoodRecipe;
