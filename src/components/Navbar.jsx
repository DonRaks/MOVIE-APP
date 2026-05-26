import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between p-4 bg-zinc-900">
      <h1 className="text-xl font-bold text-red-500">MovieApp</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </div>
  );
}