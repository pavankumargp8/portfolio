import { useState, useEffect, useRef } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import SpecularButton from './SpecularButton';
import './ChatBox.css';

const FORMSPREE_FORM_ID = process.env.REACT_APP_FORMSPREE_ID || 'xvpnyrwo';

export default function ChatBox() {
  const [step, setStep] = useState(1); // 1: Message, 2: Name, 3: Email, 4: Done
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      sender: 'pavan',
      text: "Hey! Thanks for visiting my portfolio. I'm Pavan. Feel free to leave a message here to ping me directly!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog, isTyping]);

  const triggerMailClient = () => {
    const subject = `Ping from ${name} via Portfolio`;
    const body = `${message}\n\n---\nSender: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:pavankumargp88@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    if (step === 4 && sendError) {
      triggerMailClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, sendError]);

  const addChatBubble = (sender, text) => {
    setChatLog((prev) => [...prev, { sender, text }]);
  };

  const simulateResponse = (text, nextStepDelay, action) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addChatBubble('pavan', text);
      action();
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!message.trim()) return;
      addChatBubble('user', message);
      setStep(0); // Temporary locking during typing
      simulateResponse(
        "Awesome message! Can I get your name so I know who is pinging me?",
        1000,
        () => setStep(2)
      );
    } else if (step === 2) {
      if (!name.trim()) return;
      addChatBubble('user', name);
      setStep(0);
      simulateResponse(
        `Nice to meet you, ${name}! Finally, what is your email address so I can get back to you?`,
        1000,
        () => setStep(3)
      );
    } else if (step === 3) {
      if (!email.trim() || !email.includes('@')) return;
      addChatBubble('user', email);
      setStep(0);
      
      // Save ping to localStorage
      const pings = JSON.parse(localStorage.getItem('pings') || '[]');
      pings.push({ name, email, message, timestamp: new Date().toISOString() });
      localStorage.setItem('pings', JSON.stringify(pings));

      setIsTyping(true);

      // Post in the background to Formspree
      fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then(response => {
        setIsTyping(false);
        if (response.ok) {
          setSendSuccess(true);
          addChatBubble('pavan', "Awesome! Your message has been sent directly to my inbox in the background. I'll get back to you shortly!");
          setStep(4);
        } else {
          throw new Error('Formspree request failed');
        }
      })
      .catch(() => {
        setIsTyping(false);
        setSendError(true);
        addChatBubble('pavan', "I ran into a connection issue trying to send that in the background. No worries! You can click the 'Send Mail' button below to send it using your email app.");
        setStep(4);
      });
    }
  };

  return (
    <div className="chatbox-window">
      {/* Header */}
      <div className="chatbox-header">
        <div className="chatbox-header-left">
          <div className="chatbox-avatar-wrap">
            <img src="/profile_card.jpg" alt="Pavan Kumar" className="chatbox-avatar-img" />
            <span className="chatbox-status-dot" />
          </div>
          <div className="chatbox-header-text">
            <h4>Pavan Kumar</h4>
            <span className="chatbox-status-text">Active Now</span>
          </div>
        </div>
        <div className="chatbox-header-badge">Inbox</div>
      </div>

      {/* Messages viewport */}
      <div className="chatbox-body">
        {chatLog.map((chat, i) => (
          <div key={i} className={`chatbox-bubble-row ${chat.sender}`}>
            {chat.sender === 'pavan' && (
              <img src="/profile_card.jpg" alt="Pavan avatar" className="chatbox-bubble-avatar" />
            )}
            <div className={`chatbox-bubble ${chat.sender}`}>
              <p>{chat.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chatbox-bubble-row pavan">
            <img src="/profile_card.jpg" alt="Pavan avatar" className="chatbox-bubble-avatar" />
            <div className="chatbox-bubble pavan typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={logEndRef} />
      </div>

      {/* Input Tray */}
      <div className="chatbox-footer">
        {step === 4 ? (
          sendSuccess ? (
            <div className="chatbox-success-tray" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <CheckCircle className="chatbox-success-icon" style={{ color: 'var(--color-accent-secondary)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message Sent Successfully!</span>
            </div>
          ) : (
            <div className="chatbox-success-tray" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle className="chatbox-success-icon" style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: '11px', color: 'var(--color-accent)' }}>Local Draft Prepared:</span>
              </div>
              <SpecularButton
                onClick={triggerMailClient}
                size="sm"
                radius={10}
                style={{ width: '120px', height: '36px' }}
              >
                Send Mail
              </SpecularButton>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit} className="chatbox-input-form">
            <div className="chatbox-input-wrapper">
              {step === 1 && (
                <>
                  <MessageSquare className="chatbox-input-icon" />
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="chatbox-input-field"
                    required
                    disabled={step === 0}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <User className="chatbox-input-icon" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name..."
                    className="chatbox-input-field"
                    required
                    disabled={step === 0}
                    autoFocus
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <Mail className="chatbox-input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email..."
                    className="chatbox-input-field"
                    required
                    disabled={step === 0}
                    autoFocus
                  />
                </>
              )}

              {step === 0 && (
                <input
                  type="text"
                  placeholder="Pavan is typing..."
                  className="chatbox-input-field"
                  disabled
                />
              )}
            </div>

            <button
              type="submit"
              className="chatbox-send-button"
              disabled={step === 0 || (step === 1 && !message.trim()) || (step === 2 && !name.trim()) || (step === 3 && (!email.trim() || !email.includes('@')))}
              aria-label="Send message"
            >
              <Send className="chatbox-send-icon" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
