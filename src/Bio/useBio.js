import { useState, useEffect } from 'react';

const useBio = language => {
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await fetch(
          `https://www.benetamas.com/api/bio?lang=${language}`
        );
        const bio = await response.json();
        setBio(bio.description);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBio();
  }, [language]);

  return bio;
};

export default useBio;
