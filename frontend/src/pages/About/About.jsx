import React from 'react';

const About = () => {
  return (
    <div className="bg-blue-100 min-h-screen">
    <div className="container mx-auto ">
      <h2 className="text-3xl font-semibold mb-4  p-2">About Us</h2>

      <p className="text-gray-700 mb-8">
        Welcome to XpertConsult, your go-to platform for connecting with expert professionals across
        various fields. Our mission is to facilitate meaningful interactions between experts and
        individuals seeking guidance and advice.
      </p>

      <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
      <p className="text-gray-700 mb-8">
        At XpertConsult, we believe in the power of knowledge and the impact it can have on personal
        and professional growth. Our mission is to create a space where experts can share their
        expertise and individuals can access valuable insights to make informed decisions.
      </p>

      <h3 className="text-xl font-semibold mb-4">What Sets Us Apart</h3>
      <p className="text-gray-700 mb-8">
        XpertConsult stands out for its commitment to quality and diversity. We carefully vet our
        experts to ensure a high standard of knowledge and professionalism. Our platform embraces
        diversity, offering a wide range of experts across different industries and domains.
      </p>

      <h3 className="text-xl font-semibold mb-4">Meet Our Team</h3>
      <p className="text-gray-700 mb-8">
        Behind XpertConsult is a dedicated team passionate about connecting people with the
        knowledge they seek. Get to know the individuals driving our mission and ensuring a smooth
        experience for both experts and users.
      </p>

      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <p className="text-gray-700 mb-8">
        Have questions or feedback? We&apos;d love to hear from you. Visit our{' '}
        <a href="/contact" className="text-blue-500 hover:underline">
          Contact Us
        </a>{' '}
        page to get in touch with our team.
      </p>
    </div>
    </div>
  );
};

export default About;
