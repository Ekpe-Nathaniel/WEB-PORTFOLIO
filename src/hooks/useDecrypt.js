import { useState, useEffect } from "react";

const useDecrypt = (text) => {
  const [decryptedText, setDecryptedText] = useState("");

  useEffect(() => {
    let interval;
    const decrypt = () => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (i < decryptedText.length) {
          result += text[i];
        } else {
          result += String.fromCharCode(Math.random() * (126 - 33) + 33);
        }
      }
      setDecryptedText(result);
      if (result === text) {
        clearInterval(interval);
      }
    };
    interval = setInterval(decrypt, 50);
    return () => clearInterval(interval);
  }, [text, decryptedText]);

  return decryptedText;
};

export default useDecrypt;
