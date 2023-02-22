import DailySong from "../components/DailySong";
import { Container } from "react-bootstrap"
import AuthService from "../utils/auth";



export default function Home() {
  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
   {/* <Banner/> */}
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
      <DailySong />
      </div>
      
    </Container>
  );
}
