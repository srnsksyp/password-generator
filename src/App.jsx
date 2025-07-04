import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+[]{}?";
    }
    for (let i = 1; i <= length; i++) {
      const element = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(element);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordInputRef.current?.select();
    passwordInputRef.current?.setSelectionRange(0, 99999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto my-10 p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg text-white space-y-6">
        <h1 className="text-2xl font-bold text-center text-orange-400 drop-shadow">
          🔐 Password Generator
        </h1>

        <div className="flex items-center bg-white rounded-lg shadow-inner overflow-hidden">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordInputRef}
            className="flex-grow px-4 py-2 text-black outline-none"
            placeholder="Generated password"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 transition duration-300"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm font-medium">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-2/3 accent-orange-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-sm">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-sm">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="accent-orange-400"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
