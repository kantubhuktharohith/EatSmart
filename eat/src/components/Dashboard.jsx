import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Flame, Activity, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

const Dashboard = ({ meals, profile }) => {
  const totals = useMemo(() => {
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.macros.calories,
      protein: acc.protein + meal.macros.protein,
      carbs: acc.carbs + meal.macros.carbs,
      fats: acc.fats + meal.macros.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [meals]);

  const progress = Math.min(100, (totals.calories / profile.targetCalories) * 100);

  const macroData = [
    { name: 'Protein', value: totals.protein, color: '#10b981' }, 
    { name: 'Carbs', value: totals.carbs, color: '#3b82f6' },   
    { name: 'Fats', value: totals.fats, color: '#f59e0b' },      
  ];

  const weeklyData = [
    { name: 'Mon', cal: 2100 }, { name: 'Tue', cal: 1950 }, { name: 'Wed', cal: totals.calories },
    { name: 'Thu', cal: 1905 }, { name: 'Fri', cal: 2904 }, { name: 'Sat', cal: 1700 }, { name: 'Sun', cal: 1908 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Added hover effects: scale, shadow, and border color transition */}
        <Card className="hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-200">Calories</CardTitle>
            <div className="p-2 bg-orange-100 rounded-full">
              <Flame className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold dark:text-white mb-1">{totals.calories}</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Target: {profile.targetCalories} kcal</p>
            <div className="mt-4 h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-xl hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-200">Protein</CardTitle>
            <div className="p-2 bg-emerald-100 rounded-full">
              <Activity className="h-5 w-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold dark:text-white mb-1">{totals.protein}g</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Muscle maintenance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-200">Carbs</CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Leaf className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold dark:text-white mb-1">{totals.carbs}g</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Energy source</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-200">Fats</CardTitle>
            <div className="p-2 bg-amber-100 rounded-full">
              <div className="h-5 w-5 rounded-full border-4 border-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold dark:text-white mb-1">{totals.fats}g</div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Healthy hormones</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Macro Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[250px] w-full">
              {totals.calories > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(15 23 42)', 
                        border: 'none', 
                        borderRadius: '12px', 
                        padding: '10px',
                        color: 'white',
                        fontSize: '14px'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-400 text-base">
                  No data logged today
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                  <XAxis dataKey="name" fontSize={14} tickLine={false} axisLine={false} stroke="#94a3b8" />
                  <YAxis fontSize={14} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} stroke="#94a3b8" />
                  <Tooltip 
                    cursor={{fill: 'rgb(241 245 249 / 0.1)'}} 
                    contentStyle={{ 
                      backgroundColor: 'rgb(15 23 42)', 
                      border: 'none', 
                      borderRadius: '12px',
                      padding: '10px', 
                      color: 'white',
                      fontSize: '14px'
                    }} 
                  />
                  <Bar dataKey="cal" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;