import React from 'react'
import image from '../../assets/Consulting-Illustration.png'
function Home() {
  return (
    <>
        {/* Main Content */}
        <main className="bg-blue-100 flex-1 overflow-y-auto p-4">

          {/* Landing Content */}
          <div className="bg-blue-100 h-screen flex flex-col justify-center items-center" 
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              minHeight: '100vh', // Set a minimum height to cover the entire viewport
            }}
      
          >
            <h2 className="text-8xl font-sans text-gray-800 mb-4">Welcome to <span className='font-mono font-bold'>XpertConsult</span></h2>
            <p className="text-2xl text-gray-800 mb-8">Choose your role to get started:</p>
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
          <section className="bg-blue-100 py-8">
            <div className="container mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Experts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Expert Cards */}
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Expert Name 1</h4>
                  <p className="text-white">Specialization: Legal</p>
                  <p className="text-white">Years of Experience: 10</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Expert Name 2</h4>
                  <p className="text-white">Specialization: Medical</p>
                  <p className="text-white">Years of Experience: 15</p>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <h4 className="text-xl font-bold mb-2">Expert Name 3</h4>
                  <p className="text-white">Specialization: Finance</p>
                  <p className="text-white">Years of Experience: 12</p>
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


