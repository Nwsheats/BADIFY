import DailySong from "../components/DailySong";
import { Container } from "react-bootstrap"
import AuthService from "../utils/auth";



export default function Home() {
  return (
    <div className="home" style={{ height: "80vh" }}>
    <DailySong />
    </div>
  );
}
