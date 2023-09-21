
const Home = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Expert Consultation Platform</h1>
          <div className="space-x-4">
            <a
              href="/expert"
              className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
            >
              Expert
            </a>
            <a
              href="/user"
              className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
            >
              User
            </a>
          </div>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="bg-gray-100 h-screen overflow-y-hidden flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold mb-4">Welcome to the Expert Consultation Platform</h2>
        <p className="text-lg text-gray-600 mb-8">Choose your role to get started:</p>
      </div>
    </div>
  );
};

export default Home;
