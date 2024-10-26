import React,{useRef} from 'react'
import image from '../../assets/Consulting-Illustration.png'
function Home() {
  const scrollToFeaturedExperts = () => {
    const featuredExpertsSection = document.getElementById('featured-experts');
    if (featuredExpertsSection) {
      featuredExpertsSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
        {/* Main Content */}
        <main className="bg-blue-100 flex-1 overflow-y-auto p-4">

          {/* Landing Content */}
          <div
  className="bg-blue-100 flex flex-col justify-center items-center"
  style={{
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    animation: 'fadeIn 1s ease-in-out',
  }}
>
  <h1
    className="text-6xl font-extrabold text-blue-500 bg-blue-200 bg-opacity-50 rounded p-2  animate__animated animate__fadeIn mb-4"
    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
  >
    Welcome to XpertConsult

  </h1>
  <p className="text-2xl text-gray-600 mb-8 bg-blue-200 bg-opacity-50">
    Your trusted platform for expert consultations.
  </p>
  <div className="flex space-x-4">
  <button
              onClick={scrollToFeaturedExperts}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105 duration-300"
            >
              Find an Expert
            </button>
    <a
      href="/register"
      className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-6 py-3 rounded-full transition-transform transform hover:scale-105 duration-300"
    >
      Sign Up
    </a>
  </div>
</div>



          {/* How It Works Section */}
          <section className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h3>
              <p className="text-gray-600">
                Explore available experts, choose your category, and connect with experienced professionals for personalized consultation.
              </p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Access to a wide range of experts in various fields.</li>
                <li>Secure and confidential consultations.</li>
                <li>Personalized advice tailored to your needs.</li>
                {/* Add more benefits as needed */}
              </ul>
            </div>
          </section>

          {/* Featured Experts Section */}
          <section id="featured-experts" className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Experts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Expert Cards */}
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Dr John Doe</h4>
                  <p className="text-white">Specialization: Medical - Cardiology</p>
                  <p className="text-white">Years of Experience: 10</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Alice Smith</h4>
                  <p className="text-white">Specialization: Legal - Family Law</p>
                  <p className="text-white">Years of Experience: 15</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">CodeWithHarry</h4>
                  <p className="text-white">Specialization: Technology - Web Development</p>
                  <p className="text-white">Years of Experience: 6</p>
                </div>
                {/* Add more cards as needed */}
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Cards */}
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Legal Services</h4>
                  <p className="text-white">Find legal experts for advice and consultation.</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Medical Consultation</h4>
                  <p className="text-white">Consult with medical professionals for health-related queries.</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Financial Planning</h4>
                  <p className="text-white">Get financial advice and planning from experts.</p>
                </div>
                {/* Add more category cards as needed */}
              </div>
            </div>
          </section>
          <section className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h3>
              {/* FAQ Content */}
              <div>
                <h4 className="text-xl font-bold mb-2">How does XpertConsult work?</h4>
                <p className="text-gray-600 mb-4">XpertConsult connects you with experienced professionals for personalized consultations. Simply choose your category and explore available experts.</p>

                <h4 className="text-xl font-bold mb-2">Is my consultation confidential?</h4>
                <p className="text-gray-600">Yes, XpertConsult prioritizes the security and confidentiality of your consultations.</p>
              </div>
            </div>
          </section>
          
        </main>
      </>
  )
}

export default Home


