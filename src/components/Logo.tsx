import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.png";
export default function Logo() {
  return (
    <Link to="/">
      <img src={logoUrl} alt="ZeldaLogo" className="h-10 w-auto" />
    </Link>
  );
}
