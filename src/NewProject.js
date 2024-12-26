import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './NewProject.css';

const NewProject = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    projectTitle: '',
    description: '',
    instructions: '',
    price: '',
    walletAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify EmailJS initialization
  useEffect(() => {
    emailjs.init('U0DcOPmfXZ3Btjgdp');
  }, []);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...fileList]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        if (!files || files.length === 0) {
            throw new Error("Please attach at least one file");
        }

        // Upload to file.io
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('https://file.io', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            return {
                name: file.name,
                url: data.link,
                size: file.size
            };
        });

        const uploadedFiles = await Promise.all(uploadPromises);
        console.log("Files uploaded successfully:", uploadedFiles);

        // Send email with links
        const emailData = {
            projectTitle: formData.projectTitle,
            description: formData.description,
            instructions: formData.instructions || "No instructions provided",
            price: formData.price,
            walletAddress: formData.walletAddress,
            fileList: uploadedFiles.map(f => 
                `${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`
            ).join('\n'),
            fileLinks: uploadedFiles.map(f => 
                `<a href="${f.url}">${f.name}</a>`
            ).join('<br>')
        };

        const response = await emailjs.send(
            'service_w5tuy56',
            'template_rt8etm9',
            emailData,
            'U0DcOPmfXZ3Btjgdp'
        );

        if (response.status === 200) {
            alert('Project submitted successfully!');
            setFormData({
                projectTitle: '',
                description: '',
                instructions: '',
                price: '',
                walletAddress: ''
            });
            setFiles([]);
        }

    } catch (error) {
        console.error('Submission error:', error);
        alert(`Failed to submit project: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section className="newproject-section">
      <div className="newproject-container">
        <h2 className="section-title">Submit Your Project</h2>
        
        <div className="submission-guide">
          <form 
            onSubmit={handleSubmit}
            className="newproject-form"
          >
            <div className="submission-steps">
              <div className="submission-step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Project Details</h4>
                  <div className="form-group">
                    <label>Project Title</label>
                    <input 
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                      placeholder="Enter your project title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe your project in detail"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="submission-step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Build Instructions</h4>
                  <div className="form-group">
                    <textarea
                      name="instructions"
                      value={formData.instructions}
                      onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                      placeholder="Step-by-step instructions for your project"
                      required
                    />
                    <small className="instructions-note">
                      <i className="fas fa-info-circle"></i> Leave blank if instructions are included in your uploaded files
                    </small>
                  </div>
                </div>
              </div>

              <div className="submission-step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Payment Details</h4>
                  <div className="payment-details">
                    <div className="form-group">
                      <label>Desired Price (USD)</label>
                      <div className="price-input-container">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          name="price"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      <small className="price-note">
                        Payments will be automatically converted and delivered in ETH
                      </small>
                    </div>

                    <div className="form-group">
                      <label>ETH Wallet Address</label>
                      <input
                        type="text"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                        placeholder="Your ETH wallet address (0x...)"
                        required
                      />
                      <small className="wallet-note">
                        This is where you'll receive payments for your project
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="submission-step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>Project Files and Photos</h4>
                  <div className="form-group file-upload">
                    <label className="file-upload-label">
                      <i className="fas fa-cloud-upload-alt"></i>
                      Choose Files
                      <input
                        type="file"
                        name="files"
                        multiple
                        onChange={handleFileChange}
                        className="file-input"
                      />
                    </label>
                    <p className="file-upload-info">
                      Drag and drop files here or click to browse
                      <br />
                      <br />
                      <small>Please create a ZIP archive to upload files.</small>
                    </p>
                    <div className="file-list">
                      {files.map((file, index) => (
                        <div key={index} className="file-item">
                          <span>
                            <i className="fas fa-file"></i> {file.name} 
                            ({(file.size / 1024 / 1024).toFixed(2)}MB)
                          </span>
                          <button type="button" onClick={() => removeFile(index)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Project'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewProject;
