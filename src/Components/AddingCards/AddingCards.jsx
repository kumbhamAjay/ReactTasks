import { Component } from "react";

class AddingCards extends Component {
  state = {
    name: "",
    description: "",
    card: [],
    
    
  };
  handleNameChange = (x) => {
    this.setState({
      name: x,
    });
  };
  handleDescChange = (x) => {
    this.setState({
      description: x,
    });
  };
  handleClick = () => {
   
    this.setState({
        
      card: [
        ...this.state.card,
        { name: this.state.name, description: this.state.description },
      ]
    })
   

  };
  deleteHandle = (index) => {
    
    this.setState({
        card:this.state.card.filter((obj,i)=>{
        if(i!=index){
            return obj
        }
        
    })})
  };
  
  

  render() {
    return (
      <>
      
        
        
        <div>
          <h1>Type Name and Description and Submit to add into Cards</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            this.handleNameChange(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            this.handleDescChange(e.target.value);
          }}
        />
        <button onClick={this.handleClick}>Submit</button>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {this.state.card.map((each, ind) => {
            return (
              <div
                key={ind}
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  borderRadius: "20px",
                }}
              >
                <h1>{each.name}</h1>
                <p>{each.description}</p>
                <button onClick={()=>{this.deleteHandle(ind)}}>Delete</button>
                
              </div>
            );
          })}
        </div>
      </div>
      </>
    );
  }
}
export default AddingCards;
