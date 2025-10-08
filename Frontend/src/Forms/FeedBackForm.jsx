import React, { useState,useEffect } from "react";
import { Star } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedbackData,setFeedbackData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const backend = import.meta.env.VITE_BACKEND_API;
      try {
        const response = await axios.get(`${backend}/session/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        console.log('Session data:', response.data);
        if (!response.data) {
          alert("Invalid session ID");
          navigate("/");
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        alert("Error fetching session data");
        navigate("/");
      }
    };
    fetchSession();
  },[]);

  const saveFeedback = async () => {
    const backend = import.meta.env.VITE_BACKEND_API;
    try {
      const token = localStorage.getItem('token');
      console.log("Submitting feedback:", {
        rating,
        feedback,
        sessionId: id
      });
      const response = await axios.post(
        `${backend}/session/feedback/submit`,
        {
          rating,feedback,sessionId:id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      console.log('Feedback submitted:', response.data);
      setSubmitted(true);
      navigate("/");
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert("Error submitting feedback");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide both a rating and feedback!");
      return;
    }
    saveFeedback();
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 text-center rounded-2xl shadow-md border border-green-100">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          Thank you for your feedback! 🌟
        </h2>
        <p className="text-gray-600">Your response helps improve future sessions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Share Your Feedback
      </h2>
      <p className="text-gray-500 text-center mb-6">
        How was your session with <span className="font-medium text-accent">this Mentor</span>?
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={28}
              className={`cursor-pointer transition ${
                (hover || rating) >= star
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        {/* Feedback Textarea */}
        <div>
          <label htmlFor="feedback" className="block text-gray-700 mb-2 font-medium">
            Your Comments
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience, suggestions, or highlights..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none resize-none"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full py-3 bg-accent text-primary border font-semibold rounded-lg hover:bg-accent-hover transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
