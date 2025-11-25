import React, { useState } from 'react';
import VideoConsultation from './VideoConsultation';

const VideoConsultationWrapper: React.FC = () => {
  const [isInCall, setIsInCall] = useState(true);

  const handleEndCall = () => {
    setIsInCall(false);
    // Redirect to dashboard or appointments page
    window.location.href = '/dashboard#my-appointments';
  };

  // In a real app, you would get these from route params or context
  const doctorName = "Dr. Maina";
  const appointmentId = "appt-" + Math.random().toString(36).substr(2, 9);

  if (!isInCall) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Call Ended</h2>
        <p>Your video consultation has ended.</p>
        <button onClick={() => window.location.href = '/dashboard'}>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <VideoConsultation
      doctorName={doctorName}
      appointmentId={appointmentId}
      onEndCall={handleEndCall}
    />
  );
};

export default VideoConsultationWrapper;
