import DailySong from "../components/DailySong";
import { Container, Form } from "react-bootstrap"



export default function Home({ code }) {
  
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
   {/* <Banner/> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
      <DailySong />
      </div>
      
    </Container>
  );
}
