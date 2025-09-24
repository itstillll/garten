import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css'; // eigene CSS-Datei

const supabaseUrl = 'https://pvcesutcsppdmusalkgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y2VzdXRjc3BwZG11c2Fsa2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzU0MjYsImV4cCI6MjA3NDMxMTQyNn0.1_1rEK_w5XypMLi4Ge0bQZTF6almuwBI1Kh3f4eFjKU';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({ name: '', amount: 1, status: '' });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    let { data, error } = await supabase.from('tools').select('*');
    if (error) console.log('Fehler:', error);
    else setTools(data);
  };

  const addTool = async () => {
    const { error } = await supabase.from('tools').insert([newTool]);
    if (error) console.log('Fehler beim Hinzufügen:', error);
    else {
      setNewTool({ name: '', amount: 1, status: '' });
      fetchTools();
    }
  };

  const updateTool = async (id, field, value) => {
    const { error } = await supabase
      .from('tools')
      .update({ [field]: value })
      .eq('id', id);
    if (error) console.log('Fehler beim Aktualisieren:', error);
    else fetchTools();
  };

  const deleteTool = async (id) => {
    const { error } = await supabase.from('tools').delete().eq('id', id);
    if (error) console.log('Fehler beim Löschen:', error);
    else fetchTools();
  };

  return (
    <div className="container">
      <h1>🌿 Garten-Inventar</h1>

      <div className="add-tool">
        <input
          placeholder="Name"
          value={newTool.name}
          onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Anzahl"
          value={newTool.amount}
          onChange={(e) => setNewTool({ ...newTool, amount: Number(e.target.value) })}
        />
        <input
          placeholder="Zustand"
          value={newTool.status}
          onChange={(e) => setNewTool({ ...newTool, status: e.target.value })}
        />
        <button onClick={addTool}>Hinzufügen</button>
      </div>

      <ul className="tool-list">
        {tools.map((tool) => (
          <li key={tool.id} className="tool-item">
            <input
              value={tool.name}
              onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
            />
            <input
              type="number"
              value={tool.amount}
              onChange={(e) => updateTool(tool.id, 'amount', Number(e.target.value))}
            />
            <input
              value={tool.status}
              onChange={(e) => updateTool(tool.id, 'status', e.target.value)}
            />
            <button onClick={() => deleteTool(tool.id)} className="delete-btn">
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
