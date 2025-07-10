import React, { useState, useEffect } from 'react';

interface TimerRef {
  current: NodeJS.Timeout | null;
}

const RegisterModal: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showResendButton, setShowResendButton] = useState<boolean>(false);
  const timer: TimerRef = { current: null };

  const startTimer = () => {
    const newTimer = setTimeout(() => {
      setShowResendButton(true);
    }, 60000);
    timer.current = newTimer;
  };

  useEffect(() => {
    startTimer();

    // Clean up the timer if the component unmounts
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    // Close the modal after submission if needed
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleResend = () => {
    // Logic to resend the verification code
    setShowResendButton(false);
    startTimer(); // Restart the timer
  };

  const handleCloseModal = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    setShowResendButton(false); // Hide the resend button when modal closes
    if (timer.current) {
      clearTimeout(timer.current); // Clear existing timer
    }
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
};

export default RegisterModal;
