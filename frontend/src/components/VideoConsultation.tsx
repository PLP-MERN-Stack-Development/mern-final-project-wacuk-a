import React, { useState, useRef, useEffect } from 'react';

interface VideoConsultationProps {
  doctorName: string;
  appointmentId: string;
  onEndCall: () => void;
}

const VideoConsultation: React.FC<VideoConsultationProps> = ({
  doctorName,
  appointmentId,
  onEndCall
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Simulate connection establishment
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
      startTimer();
    }, 2000);

    return () => {
      clearTimeout(connectTimer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In real app, this would toggle the video stream
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In real app, this would toggle the audio stream
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In real app, this would start/stop recording
  };

  const handleEndCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    onEndCall();
  };

  const handleShareScreen = () => {
    // In real app, this would implement screen sharing
    alert('Screen sharing would be implemented here');
  };

  const handleSendMessage = () => {
    // In real app, this would open chat
    alert('Chat feature would open here');
  };

  return (
    <div style={containerStyle}>
      <div style={callContainerStyle}>
        
        {/* Call Header */}
        <div style={headerStyle}>
          <div style={callInfoStyle}>
            <h3>Consultation with {doctorName}</h3>
            <div style={durationStyle}>
              {isConnected ? formatTime(callDuration) : 'Connecting...'}
            </div>
          </div>
          <div style={appointmentIdStyle}>
            Appointment ID: {appointmentId}
          </div>
        </div>

        {/* Video Feeds */}
        <div style={videoContainerStyle}>
          {/* Remote Video (Doctor) */}
          <div style={remoteVideoStyle}>
            <video
              ref={remoteVideoRef}
              style={videoStyle}
              autoPlay
              muted
            />
            {!isConnected && (
              <div style={connectingStyle}>
                <div style={spinnerStyle}></div>
                <p>Connecting to Dr. {doctorName}...</p>
              </div>
            )}
            <div style={remoteLabelStyle}>
              Dr. {doctorName} {isConnected && '✅'}
            </div>
          </div>

          {/* Local Video (Patient) */}
          <div style={localVideoStyle}>
            <video
              ref={localVideoRef}
              style={videoStyle}
              autoPlay
              muted
            />
            <div style={localLabelStyle}>
              You {isVideoOn ? '📹' : '📴'}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div style={controlsStyle}>
          <button
            onClick={toggleAudio}
            style={{
              ...controlButtonStyle,
              ...(!isAudioOn ? mutedButtonStyle : {})
            }}
            title={isAudioOn ? 'Mute Audio' : 'Unmute Audio'}
          >
            {isAudioOn ? '🎤' : '🔇'}
          </button>

          <button
            onClick={toggleVideo}
            style={{
              ...controlButtonStyle,
              ...(!isVideoOn ? mutedButtonStyle : {})
            }}
            title={isVideoOn ? 'Turn Off Video' : 'Turn On Video'}
          >
            {isVideoOn ? '📹' : '📷'}
          </button>

          <button
            onClick={handleShareScreen}
            style={controlButtonStyle}
            title="Share Screen"
          >
            📺
          </button>

          <button
            onClick={toggleRecording}
            style={{
              ...controlButtonStyle,
              ...(isRecording ? recordingButtonStyle : {})
            }}
            title={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isRecording ? '🔴' : '⏺️'}
          </button>

          <button
            onClick={handleSendMessage}
            style={controlButtonStyle}
            title="Send Message"
          >
            💬
          </button>

          <button
            onClick={handleEndCall}
            style={endCallButtonStyle}
            title="End Call"
          >
            📞
          </button>
        </div>

        {/* Call Features */}
        <div style={featuresStyle}>
          <div style={featureCardStyle}>
            <h4>📋 Consultation Notes</h4>
            <p>Doctor can add notes during the call</p>
          </div>
          <div style={featureCardStyle}>
            <h4>💊 Prescription</h4>
            <p>Digital prescriptions can be issued</p>
          </div>
          <div style={featureCardStyle}>
            <h4>📁 Medical Records</h4>
            <p>Access your medical history</p>
          </div>
        </div>

        {/* Connection Status */}
        <div style={statusStyle}>
          <div style={statusItemStyle}>
            <span style={statusIndicatorStyle}></span>
            Connection: {isConnected ? 'Stable' : 'Connecting...'}
          </div>
          <div style={statusItemStyle}>
            <span style={statusIndicatorStyle}></span>
            Video: {isVideoOn ? 'On' : 'Off'}
          </div>
          <div style={statusItemStyle}>
            <span style={statusIndicatorStyle}></span>
            Audio: {isAudioOn ? 'On' : 'Off'}
          </div>
          {isRecording && (
            <div style={{...statusItemStyle, color: '#dc3545'}}>
              <span style={{...statusIndicatorStyle, backgroundColor: '#dc3545'}}></span>
              Recording in progress...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle: React.CSSProperties = {
  padding: '1rem',
  backgroundColor: '#1a1a1a',
  minHeight: '100vh',
  color: 'white'
};

const callContainerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#2d2d2d',
  borderRadius: '12px',
  overflow: 'hidden'
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  backgroundColor: '#3d3d3d',
  borderBottom: '1px solid #555'
};

const callInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const durationStyle: React.CSSProperties = {
  backgroundColor: '#00A650',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.9rem',
  fontWeight: 'bold'
};

const appointmentIdStyle: React.CSSProperties = {
  color: '#ccc',
  fontSize: '0.9rem'
};

const videoContainerStyle: React.CSSProperties = {
  position: 'relative',
  height: '500px',
  backgroundColor: '#1a1a1a'
};

const remoteVideoStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

const videoStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: '#000'
};

const connectingStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: '#ccc'
};

const spinnerStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #333',
  borderTop: '4px solid #00A650',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 1rem'
};

const remoteLabelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '1rem',
  left: '1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontSize: '0.9rem'
};

const localVideoStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  width: '200px',
  height: '150px',
  border: '2px solid #00A650',
  borderRadius: '8px',
  overflow: 'hidden'
};

const localLabelStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '0.5rem',
  left: '0.5rem',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.8rem'
};

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#3d3d3d'
};

const controlButtonStyle: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  backgroundColor: '#555',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

const mutedButtonStyle: React.CSSProperties = {
  backgroundColor: '#dc3545'
};

const recordingButtonStyle: React.CSSProperties = {
  backgroundColor: '#dc3545',
  animation: 'pulse 1s infinite'
};

const endCallButtonStyle: React.CSSProperties = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  backgroundColor: '#dc3545',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const featuresStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#2d2d2d'
};

const featureCardStyle: React.CSSProperties = {
  backgroundColor: '#3d3d3d',
  padding: '1rem',
  borderRadius: '8px',
  textAlign: 'center'
};

const statusStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1rem',
  backgroundColor: '#1a1a1a',
  borderTop: '1px solid #555'
};

const statusItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.9rem',
  color: '#ccc'
};

const statusIndicatorStyle: React.CSSProperties = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#00A650'
};

export default VideoConsultation;
