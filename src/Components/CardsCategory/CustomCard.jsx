
import Card from 'react-bootstrap/Card';

function CustomCard(props) {
  const {text,image,price,title}=props
  return (
    <Card style={{ width: '18rem',height:"100%",overflow:"hidden"}}>
      <Card.Img variant="top" src={image} style={{height:"30%",width:"80%",margin:"10%"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text >
          {text}
          <p>Price:{price}</p>
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}


export default CustomCard;