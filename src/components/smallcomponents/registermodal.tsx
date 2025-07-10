import React, { useState, useEffect } from 'react';

function RegisterModal() {
  const [verificationCode, setVerificationCode] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    const newTimer = setTimeout(() => {
      setShowResendButton(true);
    }, 60000);
    setTimer(newTimer);
  };

  useEffect(() => {
    startTimer();

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification logic here
    console.log('Verification code submitted:', verificationCode);
    // Close the modal after submission if needed
    document.getElementById('my_modal_3').close();
  };

  const handleResend = () => {
    // Logic to resend the verification code
    console.log('Verification code resent');
    setShowResendButton(false);
    startTimer(); // Restart the timer
  };

  const handleCloseModal = () => {
    document.getElementById('my_modal_3').close();
    setShowResendButton(false); // Hide the resend button when modal closes
    clearTimeout(timer); // Clear existing timer
    startTimer(); // Restart the timer when modal is reopened
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          {/* Close button */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Enter Verification Code</h3>
          <p className="py-4">Please enter the verification code sent to your email.</p>

          {/* Input for verification code */}
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />

          {/* Submit and Resend buttons */}
          <div className="modal-action flex justify-end items-center space-x-4">
            {showResendButton && (
              <button
                type="button"
                className="btn bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleResend}
              >
                Resend Verification Code
              </button>
            )}
            <button
              type="submit"
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Verify Code
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default RegisterModal;
