
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Background from '@/components/Background';

const Index = () => {
  const [codeword, setCodeword] = useState('');
  const [scenarios, setScenarios] = useState<Record<string, string>>({});
  const [secretMessage, setSecretMessage] = useState<string | null>(null);
  
  // Загружаем сценарии из localStorage при монтировании
  useEffect(() => {
    const savedScenarios = localStorage.getItem('birthdayScenarios');
    if (savedScenarios) {
      setScenarios(JSON.parse(savedScenarios));
    }
  }, []);
  
  const handleCodewordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (codeword.trim() === '') return;
    
    const message = scenarios[codeword.toLowerCase().trim()];
    setSecretMessage(message || 'Шифр-слово не найдено. Попробуйте еще раз!');
    setCodeword('');
    
    // Если сообщение найдено, добавляем эффект
    if (message) {
      setTimeout(() => {
        setSecretMessage(null);
      }, 10000); // Сообщение будет показано 10 секунд
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <Background />
      
      <div className="absolute top-0 right-0 m-4 z-10">
        <Link to="/create-scenario">
          <Button 
            className="bg-transparent border border-neonPink hover:bg-neonPink/20 transition-all duration-300 animate-pulse-neon"
          >
            Создать сценарий
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 neon-text font-heading animate-pulse-neon">
          С ДНЁМ РОЖДЕНИЯ!
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-16 text-neonPurple font-heading">
          С 20-ЛЕТИЕМ
        </h2>
        
        <form onSubmit={handleCodewordSubmit} className="w-full max-w-md flex flex-col items-center">
          <input
            type="text"
            value={codeword}
            onChange={(e) => setCodeword(e.target.value)}
            className="w-full text-center text-3xl py-4 px-6 rounded-md mb-6 neon-input uppercase tracking-wider text-neonPink placeholder-neonPink/70"
            placeholder="ВВЕДИ ШИФР-СЛОВО"
          />
          
          <Button 
            type="submit" 
            className="neon-border bg-transparent hover:bg-neonPink/20 transition-all duration-300 text-xl py-6 px-8 animate-pulse-neon"
          >
            РАСКРЫТЬ СЕКРЕТ
          </Button>
        </form>
        
        {secretMessage && (
          <div className="mt-10 p-8 max-w-2xl rounded-lg border border-neonPink animate-pulse-neon bg-black/60">
            <p className="text-xl">{secretMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
