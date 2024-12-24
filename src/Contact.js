import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import confetti from 'canvas-confetti';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    emailjs.init('U0DcOPmfXZ3Btjgdp');
  }, []);

  const blastConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });

    fire(0.2, {
      spread: 60
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    console.log('Sending email with data:', {
      user_name: e.target.user_name.value,
      user_email: e.target.user_email.value,
      message: e.target.message.value,
    });

    emailjs
      .send(
        'service_w5tuy56',
        'template_n0od64c',
        {
          user_name: e.target.user_name.value,
          user_email: e.target.user_email.value,
          message: e.target.message.value,
        },
        'U0DcOPmfXZ3Btjgdp'
      )
      .then(
        (result) => {
          console.log('Success:', result);
          alert('Message sent successfully!');
          blastConfetti();
        },
        (error) => {
          console.error('Error details:', error);
          alert(`Failed to send message: ${error.text}`);
        }
      );

    e.target.reset();
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h1>Get in Touch</h1>
        <p className="contact-description">
          Have questions about our projects or need technical support? 
          Send us a message and we'll get back to you.
        </p>
        
        <form className="contact-form" onSubmit={sendEmail}>
          <div className="form-group">
            <input 
              type="text" 
              name="user_name" 
              placeholder="Your Name" 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="user_email" 
              placeholder="Your Email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
