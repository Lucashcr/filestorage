import { useMemo } from "react";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-primary text-white p-4 text-center">
      <p>&copy; {year} FileStorage</p>
    </footer>
  );
}