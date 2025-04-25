import { useState, useEffect } from 'react';

const Form = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        zip: '',
        homeowner: '',
        electricBill: '',
        roofShade: '',
        installationTimeframe: '',
        consentedProviders: []
    });

    // Available solar providers that might contact the customer
    const solarProviders = [
        { id: 'sunrun', name: 'Sunrun Solar' },
        { id: 'tesla', name: 'Tesla Energy' },
        { id: 'sunpower', name: 'SunPower' },
        { id: 'vivint', name: 'Vivint Solar' },
        { id: 'momentum', name: 'Momentum Solar' }
    ];

    // Calculate progress percentage - now we have 5 steps
    const progress = Math.min(100, ((step - 1) / 5) * 100);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle checkbox changes for provider consent
    const handleProviderConsentChange = (e) => {
        const { value, checked } = e.target;
        
        if (checked) {
            // Add the provider to consented list
            setFormData(prev => ({
                ...prev,
                consentedProviders: [...prev.consentedProviders, value]
            }));
        } else {
            // Remove the provider from consented list
            setFormData(prev => ({
                ...prev,
                consentedProviders: prev.consentedProviders.filter(item => item !== value)
            }));
        }
    };

    // Navigate to next step
    const nextStep = () => {
        // Basic validation
        if (step === 1) {
            if (!formData.name || !formData.email) {
                alert("Please fill out your name and email");
                return;
            }
        } else if (step === 2) {
            if (!formData.phone || !formData.zip) {
                alert("Please fill out your phone and ZIP code");
                return;
            }
        } else if (step === 3) {
            if (!formData.roofShade || !formData.installationTimeframe) {
                alert("Please complete all fields about your roof and installation timeline");
                return;
            }
        } else if (step === 4) {
            if (formData.consentedProviders.length === 0) {
                alert("Please select at least one solar provider that can contact you");
                return;
            }
        }
        
        setStep(prev => prev + 1);
        // Scroll to top on mobile when changing steps
        window.scrollTo(0, 0);
    };

    // Go back to previous step
    const prevStep = () => {
        setStep(prev => prev - 1);
        // Scroll to top on mobile when changing steps
        window.scrollTo(0, 0);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Allow the form to submit to formsubmit.co
        setIsSubmitting(true);
        
        // Show success message after a brief delay (form will have submitted by then)
        setTimeout(() => {
            setIsSubmitted(true);
            setIsSubmitting(false);
            // Scroll to top for thank you message
            window.scrollTo(0, 0);
        }, 1500);
    };

    // Add some styling for mobile
    useEffect(() => {
        // Add a class to body to prevent overscroll on mobile
        document.body.classList.add('overflow-x-hidden');
        
        // iOS input styling fix
        const style = document.createElement('style');
        style.textContent = `
          input, select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: 5px !important;
          }
          
          /* Fix iOS zoom on input focus */
          @media screen and (-webkit-min-device-pixel-ratio:0) { 
            select,
            textarea,
            input {
              font-size: 16px !important;
            }
          }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.body.classList.remove('overflow-x-hidden');
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:p-6">
          <div className="bg-white rounded-lg border-3 shadow-xl shadow-cyan-950 overflow-hidden w-full max-w-xl">
            <div className="bg-gray-800 p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-white">Solar Energy Savings Calculator</h1>
              <p className="text-gray-300 font-bold text-xs sm:text-sm mt-2">
                Get a personalized quote from certified local installers
              </p>
              
              {/* Progress bar - now shows 5 steps */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Step {step} of 5</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-white h-full transition-all duration-500 ease-in-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-8">
              {!isSubmitted ? (
                <form 
                  action="https://formsubmit.co/hp.rivera@outlook.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Solar Quote Request" />
                  <input type="text" name="_honey" style={{display: 'none'}} />
                  <input type="hidden" name="_template" value="table" />
                  
                  {/* Step 1: Name and Email */}
                  {step === 1 && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="bg-black p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">Personal Information</h2>
                          <p className="text-gray-600 font-bold text-xs sm:text-sm">Let's start with your basic information</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            id="name"
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            id="email"
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-6 sm:mt-8">
                        <button 
                          type="button" 
                          onClick={nextStep}
                          className="bg-amber-300 text-white rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                        >
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Contact Information */}
                  {step === 2 && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="bg-black p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">Contact Details</h2>
                          <p className="text-gray-600 font-bold text-xs sm:text-sm">How can we reach you?</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone"
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            required 
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}|[0-9]{3}-[0-9]{3}-[0-9]{4}|\([0-9]{3}\)[0-9]{3}-[0-9]{4}"
                            inputMode="tel"
                            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-sm font-bold text-gray-700 mb-1">ZIP Code</label>
                          <input 
                            type="text" 
                            id="zip"
                            name="zip" 
                            value={formData.zip}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                            placeholder="Enter ZIP code"
                            maxLength="5"
                            pattern="[0-9]{5}"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sm:mt-8">
                        <button 
                          type="button" 
                          onClick={prevStep}
                          className="w-full sm:w-auto bg-gray-200 text-gray-800 rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back
                        </button>
                        
                        <button 
                          type="button" 
                          onClick={nextStep}
                          className="w-full sm:w-auto bg-black text-black rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                        >
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Roof Conditions and Installation Timeline */}
                  {step === 3 && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="bg-black p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">Roof & Installation</h2>
                          <p className="text-gray-600 font-bold text-xs sm:text-sm">Tell us about your roof conditions and timeline</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-5">
                        <div>
                          <label htmlFor="roofShade" className="block text-sm font-bold text-gray-700 mb-1">Roof Shade Conditions</label>
                          <select 
                            id="roofShade"
                            name="roofShade" 
                            value={formData.roofShade}
                            onChange={handleChange}
                            required 
                            className="w-full border font-bold border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                          >
                            <option value="">How much shade does your roof get?</option>
                            <option value="No Shade">No Shade - Full Sun All Day</option>
                            <option value="Light Shade">Light Shade - Some Trees or Buildings</option>
                            <option value="Partial Shade">Partial Shade - Shaded Part of the Day</option>
                            <option value="Heavy Shade">Heavy Shade - Surrounded by Tall Trees/Buildings</option>
                            <option value="Unsure">I'm Not Sure</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="installationTimeframe" className="block text-sm font-bold text-gray-700 mb-1">Installation Timeline</label>
                          <select 
                            id="installationTimeframe"
                            name="installationTimeframe" 
                            value={formData.installationTimeframe}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 font-bold rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                          >
                            <option value="">When are you looking to install solar?</option>
                            <option value="Immediately">As Soon as Possible</option>
                            <option value="1-3 Months">Within 1-3 Months</option>
                            <option value="3-6 Months">Within 3-6 Months</option>
                            <option value="6-12 Months">Within 6-12 Months</option>
                            <option value="Just Researching">Just Researching for Now</option>
                          </select>
                        </div>
                        
                        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200 mt-4">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs sm:text-sm font-bold text-gray-700">
                              The amount of shade on your roof affects solar panel efficiency. South-facing roofs with minimal shade typically produce the most energy.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sm:mt-8">
                        <button 
                          type="button" 
                          onClick={prevStep}
                          className="w-full sm:w-auto bg-gray-200 text-gray-800 rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back
                        </button>
                        
                        <button 
                          type="button" 
                          onClick={nextStep}
                          className="w-full sm:w-auto bg-black text-black rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                        >
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Provider Consent */}
                  {step === 4 && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="bg-black p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">Choose Your Solar Partners</h2>
                          <p className="text-gray-600 font-bold text-xs sm:text-sm">Select which companies can contact you</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 sm:p-4 rounded-md border border-blue-200 mb-5">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          <p className="text-xs sm:text-sm text-gray-700">
                            We respect your privacy. Please select which solar providers may contact you with quotes and information. You must explicitly consent to each provider.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        {solarProviders.map(provider => (
                          <div key={provider.id} className="bg-white border border-gray-200 rounded-md p-3 sm:p-4 hover:border-gray-300 transition">
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="checkbox"
                                id={`provider-${provider.id}`}
                                name="consentedProviders"
                                value={provider.id}
                                checked={formData.consentedProviders.includes(provider.id)}
                                onChange={handleProviderConsentChange}
                                className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <div className="ml-3">
                                <span className="font-bold text-sm sm:text-base text-gray-800 block mb-1">
                                  {provider.name}
                                </span>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  I consent to be contacted by {provider.name} regarding solar installation quotes and information via email, phone, or text message.
                                </p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-5 bg-gray-50 p-3 sm:p-4 rounded-md border border-gray-200 text-xs sm:text-sm">
                        <p className="font-bold text-gray-800 mb-2">Why we need your consent:</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          <li>We partner with multiple solar providers to get you the best quotes</li>
                          <li>Each provider you select will receive your contact details</li>
                          <li>You will only be contacted by the specific providers you select</li>
                          <li>You can opt-out of communications at any time</li>
                        </ul>
                      </div>
                      
                      {/* Hidden input to store consented providers for form submission */}
                      <input 
                        type="hidden" 
                        name="consentedProvidersList" 
                        value={formData.consentedProviders.map(id => 
                          solarProviders.find(p => p.id === id)?.name
                        ).join(', ')} 
                      />
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sm:mt-8">
                        <button 
                          type="button" 
                          onClick={prevStep}
                          className="w-full sm:w-auto bg-gray-200 text-gray-800 rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back
                        </button>
                        
                        <button 
                          type="button" 
                          onClick={nextStep}
                          className="w-full sm:w-auto bg-black text-black rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                        >
                          Continue
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5: Final Details and Summary */}
                  {step === 5 && (
                    <div className="animate-fadeIn">
                      <div className="flex items-center mb-6">
                        <div className="bg-black p-2 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">Property Details</h2>
                          <p className="text-gray-600 font-bold text-xs sm:text-sm">Final information to complete your quote</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-5">
                        <div>
                          <label htmlFor="homeowner" className="block text-sm font-bold text-gray-700 mb-1">Home Ownership Status</label>
                          <select 
                            id="homeowner"
                            name="homeowner" 
                            value={formData.homeowner}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 font-bold rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                          >
                            <option value="">Are you a homeowner?</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="electricBill" className="block text-sm font-bold text-gray-700 mb-1">Average Monthly Electric Bill</label>
                          <select 
                            id="electricBill"
                            name="electricBill" 
                            value={formData.electricBill}
                            onChange={handleChange}
                            required 
                            className="w-full border border-gray-300 font-bold rounded-md p-3 focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                          >
                            <option value="">Select your average bill</option>
                            <option value="Under $100">Under $100</option>
                            <option value="$100-$200">$100-$200</option>
                            <option value="$200-$300">$200-$300</option>
                            <option value="$300-$400">$300-$400</option>
                            <option value="$400+">$400+</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Hidden inputs to store all form data for FormSubmit */}
                      <input type="hidden" name="name" value={formData.name} />
                      <input type="hidden" name="email" value={formData.email} />
                      <input type="hidden" name="phone" value={formData.phone} />
                      <input type="hidden" name="zip" value={formData.zip} />
                      <input type="hidden" name="roofShade" value={formData.roofShade} />
                      <input type="hidden" name="installationTimeframe" value={formData.installationTimeframe} />
                      
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mt-5 sm:mt-6 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 mb-2">Information Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
                          <p><span className="font-bold">Name:</span> {formData.name}</p>
                          <p><span className="font-bold">Email:</span> {formData.email}</p>
                          <p><span className="font-bold">Phone:</span> {formData.phone}</p>
                          <p><span className="font-bold">ZIP Code:</span> {formData.zip}</p>
                          <p><span className="font-bold">Roof Shade:</span> {formData.roofShade}</p>
                          <p><span className="font-bold">Timeline:</span> {formData.installationTimeframe}</p>
                        </div>
                        
                        {formData.consentedProviders.length > 0 && (
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            <p className="font-bold text-xs sm:text-sm">Approved Solar Partners:</p>
                            <ul className="list-disc pl-5 mt-1 text-xs sm:text-sm">
                              {formData.consentedProviders.map(id => (
                                <li key={id}>
                                  {solarProviders.find(p => p.id === id)?.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sm:mt-8">
                        <button 
                          type="button" 
                          onClick={prevStep}
                          className="w-full sm:w-auto bg-gray-200 text-gray-800 rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back
                        </button>
                        
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto bg-black text-black rounded-md py-2 px-4 sm:py-3 sm:px-6 font-bold hover:bg-gray-800 transition duration-300 flex items-center justify-center disabled:opacity-70"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              Get My Free Quote
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-[10px] sm:text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-gray-700 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-gray-700 hover:underline font-medium">Privacy Policy</a>
                  </p>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8 animate-fadeIn">
                  <div className="bg-green-50 p-3 sm:p-4 rounded-full mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4 sm:mb-6 border-2 border-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Thank You{formData.name ? `, ${formData.name.split(' ')[0]}` : ''}!</h2>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    Your solar quote request has been submitted successfully. We appreciate your interest in making the switch to clean, renewable energy!
                  </p>
                  
                  {formData.consentedProviders.length > 0 && (
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-md border border-gray-200 text-xs sm:text-sm text-left mx-auto max-w-md mb-4 sm:mb-6">
                      <p className="font-bold mb-2">Based on your consent, these partners will contact you:</p>
                      <ul className="list-disc pl-5 mb-2">
                        {formData.consentedProviders.map(id => (
                          <li key={id} className="mb-1">
                            {solarProviders.find(p => p.id === id)?.name}
                          </li>
                        ))}
                      </ul>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Only these specifically approved companies will receive your information.</p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 sm:p-5 rounded-md border border-blue-200 text-xs sm:text-sm text-left mx-auto max-w-md mb-4 sm:mb-6">
                    <h3 className="font-bold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">Your Solar Journey Begins</h3>
                    
                    <ol className="list-decimal pl-4 sm:pl-5 space-y-2 sm:space-y-3 text-gray-700">
                      <li><span className="font-bold">Application Review:</span> Our team will review your information within 24 hours</li>
                      <li><span className="font-bold">Savings Analysis:</span> A solar specialist will analyze your potential savings based on your location, roof conditions, and energy usage</li>
                      <li><span className="font-bold">Custom Proposal:</span> You'll receive your personalized solar quote via email</li>
                      <li><span className="font-bold">Consultation:</span> A solar consultant will reach out to answer any questions</li>
                    </ol>
                    
                    <div className="mt-3 sm:mt-4 bg-white p-2 sm:p-3 rounded border border-blue-100 flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <p className="text-[10px] sm:text-sm text-gray-600">
                        <span className="font-bold text-gray-700">Pro Tip:</span> Prepare for your consultation by gathering a recent electric bill to help our experts provide the most accurate savings estimate.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-[10px] sm:text-sm text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto">
                    <p>Having trouble? Contact our support team at <a href="mailto:support@solarcompany.com" className="text-blue-600 hover:underline">support@solarcompany.com</a> or call <a href="tel:+18005551234" className="text-blue-600 hover:underline">(800) 555-1234</a></p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button 
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center justify-center bg-blue-950 text-black py-2 px-4 sm:py-3 sm:px-5 rounded-md text-xs sm:text-sm hover:bg-gray-800 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Submit Another Request
                    </button>
                    
                    <a 
                      href="#" 
                      className="inline-flex items-center justify-center bg-green-900 text-amber-200 py-2 px-4 sm:py-3 sm:px-5 rounded-md text-xs sm:text-sm hover:bg-green-700 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Learn More About Solar Benefits
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default Form;