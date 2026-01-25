import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Utensils } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const MealLogger = ({ meals, onAddMeal, onDeleteMeal }) => {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [newItem, setNewItem] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name) return;

    onAddMeal({
      name: newItem.name,
      category: activeCategory,
      macros: {
        calories: Number(newItem.calories) || 0,
        protein: Number(newItem.protein) || 0,
        carbs: Number(newItem.carbs) || 0,
        fats: Number(newItem.fat) || 0,
      }
    });

    setNewItem({ name: '', calories: '', protein: '', carbs: '', fat: '' });
    setIsAdding(false);
  };

  const categories = ['breakfast', 'lunch', 'dinner', 'snack'];
  
  const filteredMeals = meals.filter(m => m.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Increased padding for touch targets */}
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={activeCategory === cat ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(cat)}
            className="capitalize px-6 py-2 text-base transition-transform hover:scale-105 active:scale-95"
          >
            {cat}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden border-dashed hover:border-emerald-300 transition-colors">
        {!isAdding ? (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full h-24 flex items-center justify-center gap-3 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300 group"
          >
            <div className="bg-slate-100 group-hover:bg-emerald-100 p-3 rounded-full transition-colors">
              <Plus size={24} />
            </div>
            <span className="font-semibold text-lg">Add Food to {activeCategory}</span>
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 bg-slate-50/50 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="col-span-1 md:col-span-2">
                <label className="text-sm font-bold text-slate-600 mb-2 block">Food Name</label>
                <Input 
                  className="p-3 text-base"
                  placeholder="e.g., Grilled Chicken Breast" 
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-600 mb-2 block">Calories</label>
                <Input className="p-3 text-base" type="number" placeholder="kcal" value={newItem.calories} onChange={e => setNewItem({...newItem, calories: e.target.value})} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Prot (g)</label>
                  <Input className="p-3 text-base" type="number" placeholder="P" value={newItem.protein} onChange={e => setNewItem({...newItem, protein: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Carb (g)</label>
                  <Input className="p-3 text-base" type="number" placeholder="C" value={newItem.carbs} onChange={e => setNewItem({...newItem, carbs: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-600 mb-2 block">Fat (g)</label>
                  <Input className="p-3 text-base" type="number" placeholder="F" value={newItem.fat} onChange={e => setNewItem({...newItem, fat: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="text-base px-5">Cancel</Button>
              <Button type="submit" className="text-base px-8 hover:scale-105 transition-transform shadow-md">Add Item</Button>
            </div>
          </form>
        )}
      </Card>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <Card className="flex items-center justify-between p-5 hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">{meal.name}</h4>
                    <div className="flex gap-4 text-sm text-slate-500 mt-2">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{meal.macros.calories} kcal</span>
                      <span><span className="font-semibold">P:</span> {meal.macros.protein}g</span>
                      <span><span className="font-semibold">C:</span> {meal.macros.carbs}g</span>
                      <span><span className="font-semibold">F:</span> {meal.macros.fats}g</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50 hover:scale-110 transition-all" onClick={() => onDeleteMeal(meal.id)}>
                    <Trash2 size={20} />
                  </Button>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
              <Utensils className="mx-auto h-12 w-12 mb-3 opacity-20" />
              <p className="text-lg">No meals logged for {activeCategory} yet.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealLogger;