import React, { useState } from 'react';

interface MpesaPaymentProps {
  amount: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
}

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ 
  amount, 
  onPaymentSuccess, 
  onPaymentCancel 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'input' | 'confirm' | 'processing' | 'success' | 'error'>('input');

  const handleInitiatePayment = async () => {
    if (!phoneNumber.match(/^(07|01)\d{8}$/)) {
      alert('Please enter a valid Kenyan phone number (e.g., 0712345678)');
      return;
    }
    setStep('confirm');
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setStep('processing');
    
    // Simulate M-Pesa payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful payment 90% of the time
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setStep('success');
        setTimeout(() => {
          onPaymentSuccess();
        }, 2000);
      } else {
        setStep('error');
      }
    } catch (error) {
      setStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 *** $3');
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>
            <span style={mpesaLogoStyle}>M-PESA</span>
          </div>
          <h3>Complete Payment</h3>
        </div>

        {step === 'input' && (
          <div style={contentStyle}>
            <div style={amountStyle}>
              <div style={amountLabelStyle}>Amount to Pay</div>
              <div style={amountValueStyle}>KSh {amount.toLocaleString()}</div>
            </div>
            
            <div style={inputGroupStyle}>
              <label htmlFor="phone">Enter M-Pesa Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="07XXXXXXXX"
                style={inputStyle}
                maxLength={10}
              />
              <div style={hintStyle}>Enter your Safaricom number registered with M-Pesa</div>
            </div>

            <div style={buttonGroupStyle}>
              <button 
                onClick={onPaymentCancel}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
              <button 
                onClick={handleInitiatePayment}
                style={continueButtonStyle}
                disabled={!phoneNumber}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div style={contentStyle}>
            <div style={confirmIconStyle}>🔒</div>
            <h4>Confirm Payment Details</h4>
            
            <div style={detailsStyle}>
              <div style={detailRowStyle}>
                <span>Amount:</span>
                <span><strong>KSh {amount.toLocaleString()}</strong></span>
              </div>
              <div style={detailRowStyle}>
                <span>Phone Number:</span>
                <span><strong>{formatPhoneNumber(phoneNumber)}</strong></span>
              </div>
              <div style={detailRowStyle}>
                <span>Service:</span>
                <span><strong>Medical Consultation</strong></span>
              </div>
            </div>

            <div style={instructionsStyle}>
              <p>You will receive an M-Pesa prompt on your phone to enter your PIN.</p>
            </div>

            <div style={buttonGroupStyle}>
              <button 
                onClick={() => setStep('input')}
                style={cancelButtonStyle}
              >
                Edit Details
              </button>
              <button 
                onClick={handleConfirmPayment}
                style={payButtonStyle}
              >
                Pay KSh {amount.toLocaleString()}
              </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div style={processingStyle}>
            <div style={spinnerStyle}></div>
            <h4>Processing Payment...</h4>
            <p>Please check your phone for the M-Pesa prompt</p>
            <div style={loadingDotsStyle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div style={successStyle}>
            <div style={successIconStyle}>✅</div>
            <h4>Payment Successful!</h4>
            <p>Your payment of KSh {amount.toLocaleString()} has been processed successfully.</p>
            <div style={successDetailsStyle}>
              <p><strong>Transaction ID:</strong> MP{Date.now().toString().slice(-8)}</p>
              <p><strong>Phone:</strong> {formatPhoneNumber(phoneNumber)}</p>
              <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
            <div style={successMessageStyle}>
              You will receive an SMS confirmation shortly.
            </div>
          </div>
        )}

        {step === 'error' && (
          <div style={errorStyle}>
            <div style={errorIconStyle}>❌</div>
            <h4>Payment Failed</h4>
            <p>We couldn't process your payment. This could be due to:</p>
            <ul style={errorListStyle}>
              <li>Insufficient balance</li>
              <li>Wrong PIN entered</li>
              <li>Network issues</li>
            </ul>
            <div style={buttonGroupStyle}>
              <button 
                onClick={() => setStep('input')}
                style={retryButtonStyle}
              >
                Try Again
              </button>
              <button 
                onClick={onPaymentCancel}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div style={securityStyle}>
          <div style={lockIconStyle}>🔒</div>
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem'
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '2rem',
  width: '100%',
  maxWidth: '450px',
  border: '1px solid #e1e1e1'
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '2rem',
  borderBottom: '2px solid #f0f0f0',
  paddingBottom: '1rem'
};

const logoStyle: React.CSSProperties = {
  marginBottom: '1rem'
};

const mpesaLogoStyle: React.CSSProperties = {
  backgroundColor: '#00A650',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontWeight: 'bold',
  fontSize: '1.2rem'
};

const contentStyle: React.CSSProperties = {
  marginBottom: '2rem'
};

const amountStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '2rem',
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
};

const amountLabelStyle: React.CSSProperties = {
  color: '#666',
  fontSize: '0.9rem',
  marginBottom: '0.5rem'
};

const amountValueStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#2E8B57'
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: '1.5rem'
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '1rem',
  marginTop: '0.5rem'
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: '#666',
  marginTop: '0.25rem'
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  marginTop: '2rem'
};

const cancelButtonStyle: React.CSSProperties = {
  flex: 1,
  padding: '0.75rem',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const continueButtonStyle: React.CSSProperties = {
  flex: 2,
  padding: '0.75rem',
  backgroundColor: '#00A650',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold'
};

const payButtonStyle: React.CSSProperties = {
  flex: 2,
  padding: '0.75rem',
  backgroundColor: '#00A650',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold'
};

const confirmIconStyle: React.CSSProperties = {
  fontSize: '3rem',
  textAlign: 'center',
  marginBottom: '1rem'
};

const detailsStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '1.5rem'
};

const detailRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',
  padding: '0.5rem 0',
  borderBottom: '1px solid #e9ecef'
};

const instructionsStyle: React.CSSProperties = {
  backgroundColor: '#e8f5e8',
  padding: '1rem',
  borderRadius: '4px',
  fontSize: '0.9rem',
  textAlign: 'center',
  color: '#2E8B57'
};

const processingStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '2rem'
};

const spinnerStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  border: '4px solid #f3f3f3',
  borderTop: '4px solid #00A650',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 1rem'
};

const loadingDotsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.25rem',
  marginTop: '1rem'
};

const successStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '1rem'
};

const successIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1rem'
};

const successDetailsStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '1rem',
  borderRadius: '8px',
  margin: '1.5rem 0',
  textAlign: 'left'
};

const successMessageStyle: React.CSSProperties = {
  backgroundColor: '#d4edda',
  color: '#155724',
  padding: '1rem',
  borderRadius: '4px',
  marginTop: '1rem'
};

const errorStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '1rem'
};

const errorIconStyle: React.CSSProperties = {
  fontSize: '4rem',
  marginBottom: '1rem'
};

const errorListStyle: React.CSSProperties = {
  textAlign: 'left',
  margin: '1rem 0',
  paddingLeft: '1.5rem'
};

const retryButtonStyle: React.CSSProperties = {
  flex: 2,
  padding: '0.75rem',
  backgroundColor: '#00A650',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold'
};

const securityStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  fontSize: '0.8rem',
  color: '#666'
};

const lockIconStyle: React.CSSProperties = {
  fontSize: '0.9rem'
};

export default MpesaPayment;
