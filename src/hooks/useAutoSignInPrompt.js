import { useState, useEffect } from 'react';

const useAutoSignInPrompt = (currentUser, delay = 3000) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasShownPrompt, setHasShownPrompt] = useState(false);

  useEffect(() => {
    // Only show prompt if user is not logged in and hasn't been shown before
    if (!currentUser && !hasShownPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
        setHasShownPrompt(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentUser, hasShownPrompt, delay]);

  const closePrompt = () => {
    setShowPrompt(false);
  };

  return { showPrompt, closePrompt };
};

export default useAutoSignInPrompt;
