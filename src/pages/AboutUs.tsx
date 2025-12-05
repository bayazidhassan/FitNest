const AboutUs = () => {
  return (
    <div className="my-20 max-w-7xl mx-auto px-4 space-y-20">
      {/* Company Overview */}
      <section className="text-center">
        <h1 className="text-3xl font-bold text-[#0D9488] mb-4">About Us</h1>
        <p className="text-justify md:text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At FitNest, we are committed to helping individuals achieve healthier,
          happier lives through high-quality fitness products. Founded with a
          mission to promote well-being, we continuously innovate to provide
          products that inspire positive lifestyle changes.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
              Our History
            </h3>
            <p className="text-justify md:text-center text-gray-600">
              Starting as a small wellness-focused startup, FitNest has grown
              into a trusted brand with thousands of satisfied customers across
              the world.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
              Our Mission
            </h3>
            <p className="text-justify md:text-center text-gray-600">
              To empower individuals to live healthier lives through accessible,
              high-quality fitness and wellness products.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0D9488] mb-2">
              Our Vision
            </h3>
            <p className="text-justify md:text-center text-gray-600">
              To become a globally recognized leader in wellness, inspiring a
              healthier world for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-[#0D9488] text-center mb-10">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src="https://i.ibb.co.com/jVxbGmt/profile-pic.jpg"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Alex Johnson
            </h3>
            <p className="text-[#0D9488] font-medium">Founder & CEO</p>
            <p className="text-justify md:text-center text-gray-600 mt-2">
              Passionate about fitness and innovation, Alex leads the company
              with a vision for global well-being.
            </p>
          </div>

          {/* Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src="https://i.ibb.co.com/jVxbGmt/profile-pic.jpg"
              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Sofia Martinez
            </h3>
            <p className="text-[#0D9488] font-medium">Product Manager</p>
            <p className="text-justify md:text-center text-gray-600 mt-2">
              Sofia ensures every FitNest product meets our high standards of
              performance and quality.
            </p>
          </div>

          {/* Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <img
              src="https://i.ibb.co.com/jVxbGmt/profile-pic.jpg"
              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Daniel Kim</h3>
            <p className="text-[#0D9488] font-medium">Customer Support Lead</p>
            <p className="text-justify md:text-center text-gray-600 mt-2">
              Dedicated to helping customers, Daniel ensures smooth
              communication and excellent service.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-[#0D9488] text-center mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “FitNest products have helped me stay consistent with my fitness
              routine. Amazing quality!”
            </p>
            <h4 className="mt-4 font-semibold text-[#0D9488]">— Ayesha R.</h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “Excellent customer service and fast delivery. Highly
              recommended!”
            </p>
            <h4 className="mt-4 font-semibold text-[#0D9488]">— Michael T.</h4>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-700 italic">
              “Great quality products that genuinely helped me stay healthier.”
            </p>
            <h4 className="mt-4 font-semibold text-[#0D9488]">— Priya K.</h4>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-[#0D9488] text-white p-10 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="mb-6">
          Have questions or feedback? We’d love to hear from you.
        </p>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Email:</span> support@fitnest.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +1 234 567 890
          </p>
          <p>
            <span className="font-semibold">Address:</span> 123 Wellness Street,
            Green City
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
