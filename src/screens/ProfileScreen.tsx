import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext'; 
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { User, Mail, Settings, Save, Zap } from 'lucide-react';
import BaseButton from '../components/Base/BaseButton';


interface FormData {
  name: string;
  email: string;
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  biography?: string;
  avatar?: string;
}

const ProfileScreen: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme(); 
  const [saved, setSaved] = useState(false);
  const watchedCount = useSelector((state: RootState) => state.films.watchedIds.length);
  const favoritesCount = useSelector((state: RootState) => state.films.favoriteIds.length);
  const notesCount = useSelector((state: RootState) => state.notes.notes.length);

 
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    notifications: true,
    theme: 'light',
    biography: '',
  });

  
  useEffect(() => {
    if (user) {
      const storedUserData = localStorage.getItem('userData');
      let userData: Partial<FormData> = {};
      
      if (storedUserData) {
        userData = JSON.parse(storedUserData);
      }
      
      setFormData({
        name: user.name,
        email: user.email,
        notifications: userData.notifications !== undefined ? userData.notifications : true,
        theme: theme, 
        biography: userData.biography || '',
        avatar: userData.avatar,
      });
    }
  }, [user, theme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTheme(formData.theme);
    
    const updatedUserData = {
      ...formData
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
  
    const updatedUser = {
      ...user!,
      name: formData.name,
      email: formData.email
    };
    
    updateUser(updatedUser);
  
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="container mx-auto px-4 pb-12 pt-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações e preferências</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl mb-4">
                    {formData.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  
                  <h2 className="text-xl font-bold">{formData.name}</h2>
                  <p className="text-gray-600 mb-2">{formData.email}</p>
                  
                  <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mt-1 mb-4">
                    <Zap size={14} className="mr-1" />
                    Usuário Premium
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{watchedCount}</p>
                      <p className="text-xs text-gray-500">Assistidos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{favoritesCount}</p>
                      <p className="text-xs text-gray-500">Favoritos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{notesCount}</p>
                      <p className="text-xs text-gray-500">Avaliações</p>
                    </div>
                  </div>
                </div>
                
                {formData.biography && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">Biografia</h3>
                    <p className="text-gray-800 text-sm">{formData.biography}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
      
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {saved && (
                <div className="p-4 bg-green-100 text-green-800 border-l-4 border-green-500 flex items-center">
                  <Save size={18} className="mr-2" />
                  Perfil atualizado com sucesso!
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <Settings size={20} className="mr-2" />
                  Editar Perfil
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        <User size={16} className="inline mr-2" />
                        Nome Completo
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        <Mail size={16} className="inline mr-2" />
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="biography">
                        Biografia
                      </label>
                      <textarea
                        id="biography"
                        name="biography"
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                        value={formData.biography}
                        onChange={handleChange}
                        placeholder="Conte um pouco sobre você..."
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Preferências</h3>
                      
                      <div className="flex items-center mb-4">
                        <input
                          id="notifications"
                          name="notifications"
                          type="checkbox"
                          className="h-5 w-5 text-indigo-600 rounded"
                          checked={formData.notifications}
                          onChange={handleChange as any}
                        />
                        <label htmlFor="notifications" className="ml-2 text-gray-700">
                          Receber notificações sobre novos lançamentos
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Tema da Interface
                        </label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="light"
                              checked={formData.theme === 'light'}
                              onChange={handleChange}
                              className="h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2">Claro</span>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="dark"
                              checked={formData.theme === 'dark'}
                              onChange={handleChange}
                              className="h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2">Escuro</span>
                          </label>
                          
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="theme"
                              value="system"
                              checked={formData.theme === 'system'}
                              onChange={handleChange}
                              className="h-5 w-5 text-indigo-600"
                            />
                            <span className="ml-2">Sistema</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <BaseButton
                      type="submit"
                      variant="primary"
                      size="md"
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Save size={18} className="mr-2" />
                      Salvar Alterações
                    </BaseButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileScreen;