import React from 'react';
import CarForm from './components/CarForm';
import CarList from './components/CarList';

const App: React.FC = () => {
  return (
    <div>
      <CarForm />
      <CarList />
    </div>
  );
};

export default App;
