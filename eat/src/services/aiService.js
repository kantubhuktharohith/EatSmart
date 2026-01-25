export const AIService = {
  analyzeFood: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const base = query.length * 10;
        resolve({
          foodName: query,
          estimatedMacros: {
            calories: Math.floor(base * 4.5),
            protein: Math.floor(base * 0.4),
            carbs: Math.floor(base * 0.5),
            fats: Math.floor(base * 0.2),
          },
          healthTip: `Based on "${query}", this seems like a decent source of energy. Pair with fiber for better digestion.`,
          confidence: 0.89,
        });
      }, 1500);
    });
  },

  generatePlan: async (goal) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plans = {
          lose: [
            "Breakfast: Oatmeal with berries & scoop of whey (350 kcal)",
            "Lunch: Grilled chicken salad with vinaigrette (450 kcal)",
            "Dinner: Baked salmon with asparagus (400 kcal)",
            "Snack: Greek yogurt (120 kcal)"
          ],
          maintain: [
            "Breakfast: Avocado toast with 2 eggs (500 kcal)",
            "Lunch: Turkey wrap with hummus (550 kcal)",
            "Dinner: Lean steak with roasted potatoes (600 kcal)",
            "Snack: Apple and almonds (200 kcal)"
          ],
          gain: [
            "Breakfast: 3 eggs, bacon, toast, smoothie (800 kcal)",
            "Lunch: Pasta bolognese with cheese (900 kcal)",
            "Dinner: Chicken curry with rice (850 kcal)",
            "Snack: Protein shake with peanut butter (400 kcal)"
          ]
        };
        resolve(plans[goal] || plans.maintain);
      }, 1200);
    });
  }
};