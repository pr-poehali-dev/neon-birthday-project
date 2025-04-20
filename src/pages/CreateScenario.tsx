
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Background from '@/components/Background';

const CreateScenario = () => {
  const navigate = useNavigate();
  const [codeword, setCodeword] = useState('');
  const [message, setMessage] = useState('');
  const [scenarios, setScenarios] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Загружаем существующие сценарии из localStorage
  useEffect(() => {
    const savedScenarios = localStorage.getItem('birthdayScenarios');
    if (savedScenarios) {
      setScenarios(JSON.parse(savedScenarios));
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (codeword.trim() === '' || message.trim() === '') {
      return;
    }
    
    // Добавляем новый сценарий
    const newScenarios = {
      ...scenarios,
      [codeword.toLowerCase().trim()]: message.trim()
    };
    
    // Сохраняем в localStorage
    localStorage.setItem('birthdayScenarios', JSON.stringify(newScenarios));
    setScenarios(newScenarios);
    
    // Очищаем форму
    setCodeword('');
    setMessage('');
    
    // Показываем сообщение об успехе
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <Background />
      
      <div className="absolute top-0 left-0 m-4 z-10">
        <Link to="/">
          <Button 
            className="bg-transparent border border-neonPink hover:bg-neonPink/20 transition-all duration-300 animate-pulse-neon"
          >
            Вернуться на главную
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-16 z-10 w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 neon-text font-heading">
          Создание сценария
        </h1>
        
        <form onSubmit={handleSubmit} className="w-full bg-black/40 p-8 rounded-lg neon-border">
          <div className="mb-6">
            <label htmlFor="codeword" className="block mb-2 text-xl text-neonPink">
              Шифр-слово:
            </label>
            <input
              id="codeword"
              type="text"
              value={codeword}
              onChange={(e) => setCodeword(e.target.value)}
              className="w-full p-3 rounded-md neon-input"
              placeholder="Введите секретное слово"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-xl text-neonPink">
              Сообщение:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-md neon-input min-h-[150px]"
              placeholder="Введите сообщение, которое будет показано при вводе этого шифр-слова"
            ></textarea>
          </div>
          
          <Button 
            type="submit" 
            className="w-full neon-border bg-transparent hover:bg-neonPink/20 transition-all duration-300 py-4 animate-pulse-neon"
          >
            Сохранить сценарий
          </Button>
        </form>
        
        {showSuccess && (
          <div className="mt-6 p-4 rounded-md bg-neonPink/20 border border-neonPink animate-pulse-neon">
            Сценарий успешно сохранен!
          </div>
        )}
        
        <div className="mt-10 w-full">
          <h2 className="text-2xl font-heading text-neonPurple mb-4">Существующие сценарии</h2>
          
          {Object.keys(scenarios).length === 0 ? (
            <p className="text-gray-400">Пока нет созданных сценариев</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(scenarios).map(([key, value]) => (
                <div key={key} className="p-4 rounded-md bg-black/60 border border-neonPink/40">
                  <p className="font-bold text-neonPink mb-1">Шифр-слово: {key}</p>
                  <p className="text-gray-300">{value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateScenario;
