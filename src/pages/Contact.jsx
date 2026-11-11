import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";
import "./Contact.css";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const info = [
  { icon: FiMail, label: "Email", value: "hello@wefit.com" },
  { icon: FiPhone, label: "Phone", value: "+961 1 234 567" },
  { icon: FiMapPin, label: "Location", value: "Beirut, Lebanon" },
];

// Returns an object with one message for each field that has a problem
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Please enter a valid email.";
  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // One handler for every field, using the input's name attribute
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      // Phase 1 has no backend, so we only show a success message
      setSent(true);
      setForm(emptyForm);
    }
  };

  const field = (name, label, type = "text") => (
    <div className="form-group">
      <label className="label" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={form[name]} onChange={handleChange}
        className={errors[name] ? "input invalid" : "input"} />
      {errors[name] && <p className="error-text">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions, feedback or ideas? We'd love to hear from you." />

      <section className="container contact-grid">
        <div className="info-list">
          {info.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card info-card">
              <span className="icon-box"><Icon /></span>
              <div>
                <p className="info-label">{label}</p>
                <p className="info-value">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          {sent ? (
            <div className="sent">
              <FiCheckCircle className="sent-icon" />
              <h2>Message sent!</h2>
              <p className="muted">Thanks for reaching out. We'll get back to you soon.</p>
              <button onClick={() => setSent(false)} className="btn btn-outline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="form-stack">
              <h2>Send us a message</h2>
              <div className="form-row">
                {field("name", "Full name")}
                {field("email", "Email", "email")}
              </div>
              {field("subject", "Subject")}
              <div className="form-group">
                <label className="label" htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange}
                  className={errors.message ? "input invalid" : "input"} />
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  <FiSend /> Send message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}