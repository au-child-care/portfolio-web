import { RecommendationBreakdown } from './recommendation-breakdown.dto';

export class Recommendation {
    recommendedOutcomeId = 0;
    breakdown: RecommendationBreakdown;
    matchedPercentage: RecommendationBreakdown;
}
