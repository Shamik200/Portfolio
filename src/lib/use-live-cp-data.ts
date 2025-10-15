import { useState, useEffect } from 'react';
import { fetchAllLiveData, LiveCPData } from './cp-api';
import { CPPlatform } from './cp-types';

export function useLiveCPData(staticData: CPPlatform[]) {
  const [liveData, setLiveData] = useState<LiveCPData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllLiveData();
      setLiveData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch live data');
      console.error('Error fetching live CP data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Update every 30 minutes
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Merge live data with static data
  const mergedData = staticData.map(platform => {
    if (platform.id === 'codeforces' && liveData.codeforces) {
      return {
        ...platform,
        rating: liveData.codeforces.rating,
        maxRating: liveData.codeforces.maxRating,
        rank: liveData.codeforces.rank,
        problemsSolved: liveData.codeforces.problemsSolved,
        contestsParticipated: liveData.codeforces.contestsParticipated,
        lastUpdated: lastUpdated?.toISOString() || platform.lastUpdated,
      };
    }
    
    if (platform.id === 'leetcode' && liveData.leetcode) {
      return {
        ...platform,
        rating: liveData.leetcode.ranking,
        problemsSolved: liveData.leetcode.problemsSolved,
        acceptanceRate: liveData.leetcode.acceptanceRate,
        lastUpdated: lastUpdated?.toISOString() || platform.lastUpdated,
      };
    }
    
    return platform;
  });

  return {
    data: mergedData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  };
}