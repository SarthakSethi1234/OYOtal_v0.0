import React from "react";
import "./AboutUsPage.css";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg",
    bio: "Dr. Johnson founded OYO-tal with a vision to transform healthcare accessibility. With over 15 years of experience in healthcare administration, she leads our mission to connect patients with quality care.",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "/placeholder.svg",
    bio: "Michael oversees all technical aspects of OYO-tal. His background in software engineering and healthcare informatics drives our innovative approach to solving healthcare challenges.",
  },
  {
    name: "Priya Patel",
    role: "Head of Hospital Relations",
    image: "/placeholder.svg",
    bio: "Priya manages our partnerships with healthcare providers. Her expertise in healthcare operations ensures that we maintain strong relationships with the best hospitals in every region.",
  },
  {
    name: "James Wilson",
    role: "User Experience Director",
    image: "/placeholder.svg",
    bio: "James leads our design team with a focus on creating intuitive, accessible experiences. His patient-centered approach ensures that OYO-tal is easy to use for everyone.",
  },
];

const AboutPage = () => {
  return (
    <div className="about-container">
      <header className="header">
        <h1>OYO-TAL</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/find-hospitals">Find Hospitals</a>
        </nav>
      </header>

      <main>
        <section className="intro">
          <h2>About Us</h2>
          <p>
            We're on a mission to transform healthcare access by connecting patients with the right care at the right
            time.
          </p>
        </section>

        <section className="story">
          <h2>Our Story</h2>
          <p>
            OYO-tal was founded in 2023 with a simple but powerful idea: what if patients could skip the queue and
            find the best healthcare providers in their area?
          </p>
          <p>
            Our platform was built by healthcare professionals and technology experts who understand the challenges
            patients face when seeking medical care.
          </p>
        </section>

        <section className="team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Patient First</h3>
              <p>We put patients at the center of everything we do.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously improve healthcare access with technology.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>We provide clear, accurate information for patients.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 OYO-TAL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
