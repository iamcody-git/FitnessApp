// utils/kMeansHelper.ts
function calculateDistance(userVector: number[], centroid: number[]): number {
    return Math.sqrt(
      userVector.reduce((sum, val, i) => sum + (val - centroid[i]) ** 2, 0)
    );
  }
  
  export function getRecommendedPackage(userProfileVector: number[]): string {
    const centroids: { [key: string]: number[] } = {
      Basic: [1, 1, 1, 1],      // Basic package centroid
      Gold: [2, 2, 2, 1],       // Gold package centroid
      Platinum: [3, 3, 3, 1]    // Platinum package centroid
    };
  
    const distances: { [key in keyof typeof centroids]: number } = {
      Basic: calculateDistance(userProfileVector, centroids.Basic),
      Gold: calculateDistance(userProfileVector, centroids.Gold),
      Platinum: calculateDistance(userProfileVector, centroids.Platinum)
    };
  
    // Find the package with the smallest distance
    const recommendedPackage = (Object.keys(distances) as Array<keyof typeof distances>).reduce((a, b) => 
      distances[a] < distances[b] ? a : b
    );
  
    return recommendedPackage as string;
  }
  