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
    submitStats: {
      acSubmissionNum: Array<{ difficulty: string; count: number; submissions: number }>;
    };
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

// LeetCode types
interface LeetCodeStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetCodeData {
  ranking: number;
  problemsSolved: number;
  acceptanceRate: number;
  submitStats: {
    acSubmissionNum: LeetCodeStat[];
  };
}

// LeetCode API (using unofficial GraphQL endpoint)
export async function fetchLeetCodeData(username: string): Promise<LeetCodeData | null> {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            ranking
            userAvatar
            realName
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `;

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const user = data.data.matchedUser;
    if (!user) {
      throw new Error('User not found');
    }

    const totalSolved = user.submitStats.acSubmissionNum.reduce(
      (sum: number, stat: LeetCodeStat) => sum + stat.count, 0
    );

    const totalSubmissions = user.submitStats.acSubmissionNum.reduce(
      (sum: number, stat: LeetCodeStat) => sum + stat.submissions, 0
    );

    return {
      ranking: user.profile.ranking,
      problemsSolved: totalSolved,
      acceptanceRate: totalSubmissions > 0 ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1)) : 0,
      submitStats: user.submitStats,
    };
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
}

// Function to get all live data
export async function fetchAllLiveData(): Promise<LiveCPData> {
  const [codeforcesData, leetcodeData] = await Promise.all([
    fetchCodeforcesData('R_E_D_D_E_V_I_L'),
    fetchLeetCodeData('C_RONALDO7'),
  ]);

  return {
    codeforces: codeforcesData || undefined,
    leetcode: leetcodeData || undefined,
  };
}