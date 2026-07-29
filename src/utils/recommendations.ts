import type { UserInput, Recommendation } from '../types';
import { schemes } from '../data/schemes';

export function generateRecommendations(input: UserInput): Recommendation[] {
  const results: Recommendation[] = [];

  for (const scheme of schemes) {
    let confidence = 50;
    const matched: string[] = [];

    if (input.categories.includes('Farmer') && scheme.category === 'Agriculture') {
      confidence += 35;
      matched.push('Farmer category');
    }
    if (input.categories.includes('Senior Citizen') && scheme.category === 'Social Welfare') {
      confidence += 35;
      matched.push('Senior citizen');
    }
    if (input.categories.includes('Student') && scheme.category === 'Education') {
      confidence += 35;
      matched.push('Student');
    }
    if (input.categories.includes('Women') && (scheme.category === 'Women & Child' || scheme.category === 'Entrepreneurship')) {
      confidence += 30;
      matched.push('Women category');
    }
    if (input.disability && scheme.category === 'Disability') {
      confidence += 40;
      matched.push('Disability');
    }
    if (scheme.category === 'Health') {
      confidence += 15;
      matched.push('Universal health');
    }
    if (scheme.category === 'Housing' && input.incomeRange.includes('Low')) {
      confidence += 25;
      matched.push('Low income housing');
    }
    if (scheme.category === 'Employment' && input.incomeRange.includes('Low')) {
      confidence += 20;
      matched.push('Employment support');
    }
    if (input.age < 10 && scheme.category === 'Women & Child') {
      confidence += 20;
    }

    confidence = Math.min(confidence, 98);

    if (confidence >= 60) {
      results.push({
        id: scheme.id,
        schemeName: scheme.name,
        category: scheme.category,
        description: scheme.description,
        confidence,
        benefits: scheme.benefits,
        eligibility: scheme.eligibility,
        applyUrl: 'https://www.gov.in',
      });
    }
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}
