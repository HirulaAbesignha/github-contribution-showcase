const axios = require('axios');

async function fetchData(username) {
  const token = process.env.GITHUB_TOKEN; 
  const query = `
    query {
      user(login: "${username}") {
        name
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      { query },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const user = response.data.data.user;
    if (!user) throw new Error("User not found");

    const days = user.contributionsCollection.contributionCalendar.weeks
      .flatMap(week => week.contributionDays)
      .reverse(); // Latest din se check karne ke liye

    let activeDays = 0;
    let currentStreak = 0;
    let streakBroken = false;

    days.forEach((day, index) => {
      // 1. Active Days calculate karein
      if (day.contributionCount > 0) {
        activeDays++;
      }

      // 2. Current Streak calculate karein (Latest dinon se)
      if (!streakBroken) {
        if (day.contributionCount > 0) {
          currentStreak++;
        } else if (index > 0) { 
          // Agar aaj commit nahi kiya to streak kal tak ki dikhayega
          // Lekin agar kal bhi nahi kiya tha, to streak break mani jayegi
          streakBroken = true;
        }
      }
    });

    return {
      name: user.name || username,
      total_contributions: user.contributionsCollection.contributionCalendar.totalContributions,
      active_days: activeDays,
      current_streak: currentStreak
    };
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw new Error("GitHub Data Fetch Failed");
  }
}

module.exports = { fetchData };
