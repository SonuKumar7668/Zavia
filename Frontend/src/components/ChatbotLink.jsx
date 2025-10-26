import {Link} from "react-router";

export default function ChatBotLink() {
  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 py-20 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Don’t know what you are looking for?
      </h2>
      <p className="text-gray-600 mb-6">
        Let’s talk about it and find the right guidance for you!
      </p>
      <Link to="/chat">
        <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors">
          Chat with Us
        </button>
      </Link>
    </section>
  );
}
