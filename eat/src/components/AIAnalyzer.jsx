import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, Plus, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Badge } from './ui/Badge';
import { AIService } from '../services/aiService';

const AIAnalyzer = ({ onAddFromAI }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);
    try {
      const data = await AIService.analyzeFood(query);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (result) {
      onAddFromAI({
        name: result.foodName,
        category: 'snack', // Defaulting to snack
        macros: result.estimatedMacros
      });
      setQuery('');
      setResult(null);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-8">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <Brain className="h-6 w-6 text-purple-500" />
              AI Food Scanner
            </CardTitle>
            <p className="text-base text-slate-500">Describe your food, and our AI will estimate its nutrition.</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex gap-3">
              <Input 
                className="text-lg p-3"
                placeholder="e.g., Large pepperoni pizza slice" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isLoading || !query}
                className="px-6 hover:scale-105 transition-transform"
              >
                {isLoading ? <span className="animate-spin">⏳</span> : <Search size={20} />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 hover:border-purple-200 transition-colors">
          <CardHeader>
            <CardTitle className="text-base text-purple-900 font-bold">Did you know?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-purple-800 leading-relaxed">
              Using generic terms like "Sandwich" gives lower accuracy. Try <strong>"Turkey sandwich with swiss on rye"</strong> for better AI precision.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-emerald-100 shadow-xl overflow-hidden">
                <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-2xl text-emerald-900 capitalize">{result.foodName}</h3>
                      <Badge variant="outline" className="mt-2 bg-white px-3 py-1 text-sm">
                        {Math.round(result.confidence * 100)}% Confidence
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={handleSave} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-base px-4 py-2 hover:scale-105 transition-transform shadow-md"
                    >
                      <Plus size={18} className="mr-1" /> Log It
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-8 px-6 pb-6">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-4xl font-extrabold text-slate-900 mb-1">{result.estimatedMacros.calories}</div>
                      <div className="text-sm text-slate-500 uppercase tracking-wide font-semibold">Calories</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 justify-center">
                      <div className="flex justify-between text-base border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Protein</span>
                        <span className="font-bold text-slate-700">{result.estimatedMacros.protein}g</span>
                      </div>
                      <div className="flex justify-between text-base border-b border-slate-100 pb-1">
                        <span className="text-slate-500">Carbs</span>
                        <span className="font-bold text-slate-700">{result.estimatedMacros.carbs}g</span>
                      </div>
                      <div className="flex justify-between text-base">
                        <span className="text-slate-500">Fats</span>
                        <span className="font-bold text-slate-700">{result.estimatedMacros.fats}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-blue-50 text-blue-900 rounded-xl text-base leading-relaxed border border-blue-100">
                    <Info className="h-6 w-6 shrink-0 mt-0.5 text-blue-600" />
                    {result.healthTip}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIAnalyzer;