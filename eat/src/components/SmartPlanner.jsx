import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { AIService } from '../services/aiService';

const SmartPlanner = ({ profile }) => {
  const [plan, setPlan] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    handleGenerate();
  }, [profile.goal]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newPlan = await AIService.generatePlan(profile.goal);
    setPlan(newPlan);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Your Recommended Plan</h2>
          <p className="text-slate-500 mt-1 text-lg">Tailored for: <span className="font-bold text-emerald-600 uppercase tracking-wide">{profile.goal}</span></p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="hover:scale-105 active:scale-95 transition-transform border-2 text-base px-6 py-2"
        >
          {isGenerating ? 'Designing...' : 'Refresh Plan'}
        </Button>
      </div>

      <div className="grid gap-5">
        {isGenerating ? (
          <div className="p-16 text-center text-slate-400">
            <div className="animate-spin text-4xl mb-4">⚡</div>
            <span className="text-xl">Thinking...</span>
          </div>
        ) : (
          plan.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="hover:border-emerald-300 hover:shadow-md hover:translate-x-1 transition-all duration-300 cursor-default group">
                <CardContent className="p-6 flex items-start gap-5">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg text-slate-900 mb-1">{item.split(':')[0]}</p>
                    <p className="text-base text-slate-600 leading-relaxed">{item.split(':')[1]}</p>
                  </div>
                  <CheckCircle2 className="text-slate-200 group-hover:text-emerald-500 transition-colors h-6 w-6 mt-1" />
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
      
      <div className="p-5 bg-amber-50 rounded-xl border border-amber-100 flex gap-4 text-base text-amber-900 items-start">
        <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
        <p>This plan is AI-generated based on general data. Please consult a nutritionist for professional medical advice.</p>
      </div>
    </div>
  );
};

export default SmartPlanner;