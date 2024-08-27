import { Component } from "react";

import Card from "react-bootstrap/Card";
import image1 from "./Assets/bulbOn.jpg";
import image from "./Assets/bulbOff.jpg";

class Bulb extends Component {
  state = {
    bulb: [ {imge:image,status:"OFF"} ],
    bulbonoff:[],
    
  };
  addBulb = () => {
    let newAdd = {imge:image,status:"OFF"};
    this.setState({
      bulb: [...this.state.bulb, newAdd],
    });
  };
  handleBulb=(x,index)=>{
    
    if(x==image){
        this.setState({
            
            bulb:this.state.bulb.map((a,b)=>{
                if(b==index){
                    a.imge=image1
                    a.status="ON"
                    return a
                }
                else{
                   
                    return a
                }
            })
        })
    }
    else{
        this.setState({
           
            bulb:this.state.bulb.map((a,b)=>{
                if(b==index){
                    a.imge=image
                    a.status="OFF"
                    return a
                }
                else{
                    
                    return a
                }
            })
        })
    }
  }
  render() {
    return (
      <>
        <button onClick={this.addBulb}>Add Bulb</button>
        <p>Number of Bulbs {this.state.bulb.length}</p>
        <div style={{ display: "flex", gap: "20px" ,flexWrap:"wrap",border:"1px solid black"}}>
          {this.state.bulb.map((each,ind) => {
            return(
            <Card key={ind} style={{ width: "250px", height: "300px"}}>
              <Card.Img onClick={()=>this.handleBulb(each.imge,ind)}
                variant="top"
                src={each.imge}
                style={{ height: "80%", width: "100%",  }}
              />
              <Card.Text style={{textAlign:"center"}}>
                  {each.status}
                  
                </Card.Text>
              <Card.Body>
               
                
                
              </Card.Body>
            </Card>
            )
          })}
        </div>
      </>
    );
  }
}
export default Bulb;
