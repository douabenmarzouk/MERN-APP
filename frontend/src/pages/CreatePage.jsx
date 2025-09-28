import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <div data-theme="coffee" className="min-h-screen bg-base-200 py-9">
      <div className="max-w-4xl mx-auto px-4">
       
        {/* Back button */}
        <Link to="/" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeftIcon size={20} />
          Back To Notes
        </Link>

        {/* Card */}
        <div className="card bg-base-100 dark:bg-base-800 shadow-xl w-full max-w-2xl mx-auto">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6 text-center">Create New Note</h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input - Full Width Block */}
              <div className="form-control w-full" >
                <label className="label">
                  <span className="label-text text-base font-medium">Note Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your note title..."
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                
                />
              </div>

              {/* Content Input - Full Width Block */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base font-medium">Content</span>
                </label>
                <textarea
                  placeholder="Write your note content here..."
                  className="textarea textarea-bordered w-full h-32 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Submit button */}
              <div className="form-control mt-8">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                  disabled={loading || !title.trim() || !content.trim()}
                >
                  {loading ? "Saving Note..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;