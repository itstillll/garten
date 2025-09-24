import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [tools, setTools] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [newTool, setNewTool] = useState({ name: '', amount: 1, status: 'Gut' });
  const [newDrink, setNewDrink] = useState({ name: '', amount: 1, status: 'Kühl' });

  useEffect(() => {
    loadTools();
    loadDrinks();
  }, []);

  const loadTools = async () => {
    const { data, error } = await supabase.from('tools').select('*').order('id', { ascending: true });
    if (!error) setTools(data);
  };

  const loadDrinks = async () => {
    const { data, error } = await supabase.from('drinks').select('*').order('id', { ascending: true });
    if (!error) setDrinks(data);
  };

  const addTool = async (e) => {
    e.preventDefault();
    if (!newTool.name) return;
    const { data, error } = await supabase.from('tools').insert([newTool]).select();
    if (!error) {
      setTools([...tools, ...data]);
      setNewTool({ name: '', amount: 1, status: 'Gut' });
    } else {
      console.log(error);
    }
  };

  const addDrink = async (e) => {
    e.preventDefault();
    if (!newDrink.name) return;
    const { data, error } = await supabase.from('drinks').insert([newDrink]).select();
    if (!error) {
      setDrinks([...drinks, ...data]);
      setNewDrink({ name: '', amount: 1, status: 'Kühl' });
    } else {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Garten-Inventar</h1>

      <section>
        <h2>Tools</h2>
        <form onSubmit={addTool}>
          <input
            type="text"
            placeholder="Name"
            value={newTool.name}
            onChange={e => setNewTool({ ...newTool, name: e.target.value })}
          />
          <input
            type="number"
            value={newTool.amount}
            min={1}
            onChange={e => setNewTool({ ...newTool, amount: Number(e.target.value) })}
          />
          <select value={newTool.status} onChange={e => setNewTool({ ...newTool, status: e.target.value })}>
            <option>Gut</option>
            <option>Mittel</option>
            <option>Schlecht</option>
          </select>
          <button type="submit">Hinzufügen</button>
        </form>
        <ul>
          {tools.map(tool => (
            <li key={tool.id}>{tool.name} - {tool.amount} - {tool.status}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Getränke</h2>
        <form onSubmit={addDrink}>
          <input
            type="text"
            placeholder="Name"
            value={newDrink.name}
            onChange={e => setNewDrink({ ...newDrink, name: e.target.value })}
          />
          <input
            type="number"
            value={newDrink.amount}
            min={1}
            onChange={e => setNewDrink({ ...newDrink, amount: Number(e.target.value) })}
          />
          <select value={newDrink.status} onChange={e => setNewDrink({ ...newDrink, status: e.target.value })}>
            <option>Kühl</option>
            <option>Zimmertemperatur</option>
          </select>
          <button type="submit">Hinzufügen</button>
        </form>
        <ul>
          {drinks.map(drink => (
            <li key={drink.id}>{drink.name} - {drink.amount} - {drink.status}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
