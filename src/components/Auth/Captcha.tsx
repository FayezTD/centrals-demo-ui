import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

interface CaptchaProps {
  value: string;
  onChange: (value: string) => void;
  onVerify: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ value, onChange, onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');

  const generateCaptcha = (): string => {
    const letters = 'ABCDEFGHJKMNPQRSTUVWXYZ';
    const numbers = '23456789';
    
    const letterCount = Math.floor(Math.random() * 3) + 2; // 2-4 letters
    const numberCount = 6 - letterCount;
    
    const chars: string[] = [];
    for (let i = 0; i < letterCount; i++) {
      chars.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    for (let i = 0; i < numberCount; i++) {
      chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    
    // Shuffle
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    return chars.join('');
  };

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  useEffect(() => {
    if (value.length >= 6) {
      const isValid = value === captchaText;
      onVerify(isValid);
    } else {
      onVerify(false);
    }
  }, [value, captchaText, onVerify]);

  const handleRefresh = () => {
    setCaptchaText(generateCaptcha());
    onChange('');
    onVerify(false);
  };

  const renderCaptchaDisplay = () => {
    const colors = ['#1e293b', '#2c3e50', '#e74c3c', '#8e44ad', '#2980b9', '#27ae60'];
    
    return (
      <div className="captcha-display">
        {captchaText.split('').map((char, index) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          const rotation = Math.floor(Math.random() * 30) - 15;
          
          return (
            <span
              key={index}
              style={{
                color,
                transform: `rotate(${rotation}deg)`,
                display: 'inline-block',
                margin: '0 3px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="captcha-container mb-3">
      <Form.Label>Security Verification</Form.Label>
      <div className="captcha-box">
        {renderCaptchaDisplay()}
      </div>
      <InputGroup className="mt-2">
        <Form.Control
          type="text"
          placeholder="Enter CAPTCHA"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          maxLength={6}
          aria-label="CAPTCHA input"
        />
        <Button variant="outline-secondary" onClick={handleRefresh} title="Refresh CAPTCHA">
          <i className="fas fa-sync-alt"></i>
        </Button>
      </InputGroup>
    </div>
  );
};

export default Captcha;
