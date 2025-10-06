import { Route, Routes } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Schedule from "@/pages/Schedule";
import Trainers from "@/pages/Trainers";
import Contact from "@/pages/Contact";
import BookingSuccess from "@/pages/BookingSuccess";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
