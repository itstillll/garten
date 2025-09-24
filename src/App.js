import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvcesutcsppdmusalkgo.supabase.co';
const supabaseKey = 'DEIN_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({ name: '', amount: 1, status: '' });

  const [drinks, setDrinks] = useState([]);
  const [newDrink, setNewDrink] = useState({ name: '', amount: 1, status: '' });

  useEffect(() => {
    fetchTools();
    fetchDrinks();
  }, []);

  const fetchTools = async () => {
    let { data, error } = await supabase.from('tools').select('*');
    if (error) console.log('Fehler Tools:', error);
    else setTools(data);
  };

  const fetchDrinks = async () => {
    let { data, error } = await supabase.from('drinks').select('*');
    if (error) console.log('Fehler Drinks:', error);
    else setDrinks(data);
  };

  const addTool = async () => {
    const { error } = await supabase.from('tools').insert([newTool]);
    if (error) console.log('Fehler beim Hinzufügen Tool:', error);
    else {
      setNewTool({ name: '', amount: 1, status: '' });
      fetchTools();
    }
  };

  const addDrink = async () => {
    const { error } = await supabase.from('drinks').insert([newDrink]);
    if (error) console.log('Fehler beim Hinzufügen Drink:', error);
    else {
      setNewDrink({ name: '', amount: 1, status: '' });
      fetchDrinks();
    }
  };

  const updateItem = async (table, id, field, value) => {
    const { error } = await supabase.from(table).update({ [field]: value }).eq('id', id);
    if (error) console.log(`Fehler beim Aktualisieren ${table}:`, error);
    else table === 'tools' ? fetchTools() : fetchDrinks();
  };

  const deleteItem = async (table, id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) console.log(`Fehler beim Löschen ${table}:`, error);
    else table === 'tools' ? fetchTools() : fetchDrinks();
  };

  const cardStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const inputStyle = {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minWidth: '80px'
  };

  const buttonStyle = {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer'
  };

  const sectionTitleStyle = { marginTop: '20px', marginBottom: '10px' };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Garten-Inventar</h1>

      <h2 style={sectionTitleStyle}>Neues Tool hinzufügen</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input placeholder="Name" value={newTool.name} style={inputStyle} onChange={(e) => setNewTool({ ...newTool, name: e.target.value })} />
        <input type="number" placeholder="Anzahl" value={newTool.amount} style={inputStyle} onChange={(e) => setNewTool({ ...newTool, amount: Number(e.target.value) })} />
        <input placeholder="Zustand" value={newTool.status} style={inputStyle} onChange={(e) => setNewTool({ ...newTool, status: e.target.value })} />
        <button style={buttonStyle} onClick={addTool}>Hinzufügen</button>
      </div>

      <h2 style={sectionTitleStyle}>Tools</h2>
      {tools.map((tool) => (
        <div key={tool.id} style={cardStyle}>
          <input value={tool.name} style={inputStyle} onChange={(e) => updateItem('tools', tool.id, 'name', e.target.value)} />
          <input type="number" value={tool.amount} style={inputStyle} onChange={(e) => updateItem('tools', tool.id, 'amount', Number(e.target.value))} />
          <input value={tool.status} style={inputStyle} onChange={(e) => updateItem('tools', tool.id, 'status', e.target.value)} />
          <button style={{ ...buttonStyle, backgroundColor: '#f44336' }} onClick={() => deleteItem('tools', tool.id)}>Löschen</button>
        </div>
      ))}

      <h1 style={{ marginTop: '40px' }}>Getränke</h1>

      <h2 style={sectionTitleStyle}>Neues Getränk hinzufügen</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input placeholder="Name" value={newDrink.name} style={inputStyle} onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })} />
        <input type="number" placeholder="Anzahl" value={newDrink.amount} style={inputStyle} onChange={(e) => setNewDrink({ ...newDrink, amount: Number(e.target.value) })} />
        <input placeholder="Zustand" value={newDrink.status} style={inputStyle} onChange={(e) => setNewDrink({ ...newDrink, status: e.target.value })} />
        <button style={buttonStyle} onClick={addDrink}>Hinzufügen</button>
      </div>

      <h2 style={sectionTitleStyle}>Drinks</h2>
      {drinks.map((drink) => (
        <div key={drink.id} style={cardStyle}>
          <input value={drink.name} style={inputStyle} onChange={(e) => updateItem('drinks', drink.id, 'name', e.target.value)} />
          <input type="number" value={drink.amount} style={inputStyle} onChange={(e) => updateItem('drinks', drink.id, 'amount', Number(e.target.value))} />
          <input value={drink.status} style={inputStyle} onChange={(e) => updateItem('drinks', drink.id, 'status', e.target.value)} />
          <button style={{ ...buttonStyle, backgroundColor: '#f44336' }} onClick={() => deleteItem('drinks', drink.id)}>Löschen</button>
        </div>
      ))}
    </div>
  );
}

export default App;
