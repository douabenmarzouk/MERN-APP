import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI"; 
import NoteCard from "../components/NoteCard";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Choisir l'URL selon l'environnement
  const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://mern-app-14-b76d.onrender.com";

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/notes`);
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes", error);
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [API_URL]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-7 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes ...</div>
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && (
          <div className="text-center py-10 text-gray-500">
            No notes available
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
