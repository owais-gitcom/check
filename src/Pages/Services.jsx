import "./Services.css";

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-content">
        <h1>Our Services</h1>
        <p>
          At <strong>MyWebsite</strong>, we offer a wide range of services to help you build, grow, and optimize your digital presence.
        </p>
        
        <div className="services-list">
          <div className="service-card">
            <h3>Web Development</h3>
            <p>Custom websites built with modern technologies that are fast, responsive, and secure.</p>
          </div>

          <div className="service-card">
            <h3>Web Design</h3>
            <p>Creating visually stunning and user-friendly website designs tailored to your brand.</p>
          </div>

          <div className="service-card">
            <h3>Graphic Designing</h3>
            <p>Creative graphics, logos, and branding materials to make your business stand out.</p>
          </div>

          <div className="service-card">
            <h3>UI/UX Designing</h3>
            <p>Designing intuitive interfaces and seamless user experiences for web and mobile apps.</p>
          </div>
        </div>

        <p>Contact us today to learn how we can help you achieve your digital goals!</p>
      </div>
    </div>
  );
};

export default Services;
