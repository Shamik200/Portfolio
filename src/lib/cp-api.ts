// Utility functions to fetch live competitive programming data

export interface LiveCPData {
  codeforces?: {
    rating: number;
    maxRating: number;
    rank: string;
    problemsSolved: number;
    contestsParticipated: number;
  };
  leetcode?: {
    ranking: number;
    problemsSolved: number;
    acceptanceRate: number;
  };
  codechef?: {
    rating: number;
    maxRating: number;
    rank: string;
    problemsSolved: number;
    contestsParticipated: number;
  };
}

// Types for API responses
interface CodeforcesSubmission {
  verdict: string;
  problem: {
    contestId: number;
    index: string;
  };
}

interface CodeforcesData {
  rating: number;
  maxRating: number;
  rank: string;
  problemsSolved: number;
  contestsParticipated: number;
}

// Codeforces API
export async function fetchCodeforcesData(username: string): Promise<CodeforcesData | null> {
  try {
    const userInfoResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
    const userInfo = await userInfoResponse.json();
    
    if (userInfo.status !== 'OK') {
      throw new Error('Failed to fetch Codeforces user info');
    }

    const userStatusResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}&count=10000`);
    const userStatus = await userStatusResponse.json();

    const user = userInfo.result[0];
    const submissions = userStatus.status === 'OK' ? userStatus.result : [];
    
    const acceptedProblems = new Set();
    submissions.forEach((submission: CodeforcesSubmission) => {
      if (submission.verdict === 'OK') {
        acceptedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
      }
    });

    const contestsResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
    const contestsData = await contestsResponse.json();
    const contestsParticipated = contestsData.status === 'OK' ? contestsData.result.length : 0;

    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || 'Unrated',
      problemsSolved: acceptedProblems.size,
      contestsParticipated: contestsParticipated,
    };
  } catch (error) {
    console.error('Error fetching Codeforces data:', error);
    return null;
  }
}

// LeetCode data via community stats API (avoids CORS issues)
interface LeetCodeData {
  ranking: number;
  problemsSolved: number;
  acceptanceRate: number;
}

export async function fetchLeetCodeData(username: string): Promise<LeetCodeData | null> {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`LeetCode API returned ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch LeetCode data');
    }

    return {
      ranking: data.ranking || 0,
      problemsSolved: data.totalSolved || 0,
      acceptanceRate: data.acceptanceRate || 0,
    };
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
}

// CodeChef data via community API
interface CodeChefData {
  rating: number;
  maxRating: number;
  rank: string;
  problemsSolved: number;
  contestsParticipated: number;
}

export async function fetchCodeChefData(username: string): Promise<CodeChefData | null> {
  try {
    const response = await fetch(`https://codechef-api.vercel.app/${username}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`CodeChef API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch CodeChef data');
    }

    return {
      rating: data.currentRating || 0,
      maxRating: data.highestRating || 0,
      rank: data.stars ? `${data.stars} Star` : 'Unrated',
      problemsSolved: data.fullySolved?.length || 0,
      contestsParticipated: data.ratingData?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching CodeChef data:', error);
    return null;
  }
}

// Function to get all live data
export async function fetchAllLiveData(): Promise<LiveCPData> {
  const [codeforcesData, leetcodeData, codechefData] = await Promise.all([
    fetchCodeforcesData('R_E_D_D_E_V_I_L'),
    fetchLeetCodeData('C_RONALDO7'),
    fetchCodeChefData('shamik_munjani'),
  ]);

  return {
    codeforces: codeforcesData || undefined,
    leetcode: leetcodeData || undefined,
    codechef: codechefData || undefined,
  };
}