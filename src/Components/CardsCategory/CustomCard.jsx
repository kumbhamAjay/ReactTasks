
import Card from 'react-bootstrap/Card';

function CustomCard({title,text,image,price}) {
  return (
    <Card style={{ width: '18rem',height:"100%" }}>
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