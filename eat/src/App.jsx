import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Utensils, Brain, Calendar, User, Settings, ChevronRight, Moon, Sun 
} from 'lucide-react';
import { cn, generateId } from './lib/utils';

// Import Components
import Dashboard from './components/Dashboard';
import MealLogger from './components/MealLogger';
import AIAnalyzer from './components/AIAnalyzer';
import SmartPlanner from './components/SmartPlanner';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Select } from './components/ui/Select';
import { Button } from './components/ui/Button';

// NavButton with increased size and scale effect
function NavButton({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 text-base font-medium", // Increased padding and text-base
        active 
          ? "bg-emerald-100/50 text-emerald-800 shadow-md ring-1 ring-emerald-200/50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-900/50 scale-[1.02]" 
          : "text-slate-600 hover:bg-white/60 hover:text-slate-900 hover:shadow-sm hover:scale-[1.02] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      )}
    >
      <span className={cn(active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500")}>{icon}</span>
      {children}
      {active && <ChevronRight size={18} className="ml-auto opacity-50" />}
    </button>
  );
}

export default function EatSmartApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Apply Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
  }, [isDark]);

  const [meals, setMeals] = useState([
    { id: '1', name: 'Oatmeal & Berries', category: 'breakfast', macros: { calories: 350, protein: 12, carbs: 60, fats: 6 }, timestamp: Date.now() },
    { id: '2', name: 'Grilled Chicken Salad', category: 'lunch', macros: { calories: 450, protein: 40, carbs: 12, fats: 20 }, timestamp: Date.now() }
  ]);
  const [userProfile, setUserProfile] = useState({
    name: 'Alex',
    goal: 'maintain',
    targetCalories: 2200
  });

  const addMeal = (meal) => {
    const newMeal = { ...meal, id: generateId(), timestamp: Date.now() };
    setMeals(prev => [...prev, newMeal]);
  };

  const deleteMeal = (id) => {
    setMeals(prev => prev.filter(m => m.id !== id));
  };

  const updateProfile = (key, value) => {
    setUserProfile(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100 dark:bg-none dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 backdrop-blur-md dark:bg-slate-900/95 border-r border-slate-200/60 dark:border-slate-800 flex flex-col sticky top-0 md:h-screen z-20 transition-all duration-300">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-200 dark:shadow-none">
            E
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-800 dark:text-white">EatSmart</span>
        </div>
        
        <nav className="flex-1 p-6 space-y-3">
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<TrendingUp size={22} />}>Dashboard</NavButton>
          <NavButton active={activeTab === 'log'} onClick={() => setActiveTab('log')} icon={<Utensils size={22} />}>Meal Log</NavButton>
          <NavButton active={activeTab === 'analyze'} onClick={() => setActiveTab('analyze')} icon={<Brain size={22} />}>AI Analyzer</NavButton>
          <NavButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')} icon={<Calendar size={22} />}>Smart Plan</NavButton>
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
           {/* Theme Toggle Button */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:shadow-md hover:scale-[1.02] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <div className="h-9 w-9 rounded-full bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 dark:text-slate-400 transition-transform group-hover:rotate-12">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            
            <span className="text-left font-medium text-base">
              {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 text-sm font-medium border border-transparent hover:scale-[1.02] hover:shadow-md",
              activeTab === 'settings' 
                ? "bg-slate-100 text-slate-900 border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700" 
                : "text-slate-500 hover:text-slate-900 hover:bg-white dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            )}
          >
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <User size={18} />
            </div>
            <div className="text-left">
              <p className="text-slate-900 dark:text-white font-semibold text-base">{userProfile.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{userProfile.goal}</p>
            </div>
            <Settings size={18} className="ml-auto opacity-70" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800 py-6 px-10 flex justify-between items-center sticky top-0 z-10 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white capitalize tracking-tight">{activeTab.replace('-', ' ')}</h1>
          <div className="text-base font-medium text-slate-500 dark:text-slate-400 hidden md:block bg-slate-100/50 dark:bg-slate-800/50 px-4 py-2 rounded-full">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard meals={meals} profile={userProfile} />}
          {activeTab === 'log' && <MealLogger meals={meals} onAddMeal={addMeal} onDeleteMeal={deleteMeal} />}
          {activeTab === 'analyze' && <AIAnalyzer onAddFromAI={addMeal} />}
          {activeTab === 'plan' && <SmartPlanner profile={userProfile} />}
          
          {activeTab === 'settings' && (
            <Card className="max-w-xl mx-auto hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">User Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-base font-medium mb-2 dark:text-slate-300">Display Name</label>
                  <Input className="text-lg p-3" value={userProfile.name} onChange={(e) => updateProfile('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2 dark:text-slate-300">Health Goal</label>
                  <Select 
                    className="text-lg p-3"
                    value={userProfile.goal}
                    onChange={(v) => updateProfile('goal', v)}
                    options={[
                      { label: 'Weight Loss', value: 'lose' },
                      { label: 'Maintenance', value: 'maintain' },
                      { label: 'Muscle Gain', value: 'gain' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-base font-medium mb-2 dark:text-slate-300">Daily Calorie Target</label>
                  <Input className="text-lg p-3" type="number" value={userProfile.targetCalories} onChange={(e) => updateProfile('targetCalories', Number(e.target.value))} />
                </div>
                <div className="pt-6 flex justify-end">
                  <Button className="text-lg px-6 py-3 hover:scale-105 transition-transform" onClick={() => setActiveTab('dashboard')}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}