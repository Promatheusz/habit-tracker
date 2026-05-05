import React, { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState("Łączenie z serwerem...");

  useEffect(() => {
    fetch('http://localhost:5001/')
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg("Błąd połączenia z backendem!"));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>Witaj w Grywalizacji Rozwoju Osobistego!</h1>
      <p>Status systemu: <strong>{msg}</strong></p>
    </div>
  );
}

export default App;