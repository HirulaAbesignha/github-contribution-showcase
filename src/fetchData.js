const fetch = require("node-fetch");
const fs = require("fs");

const username = "ayushraistudio";

async function fetchGitHubData() {
  console.log("Fetching REAL ACTIVE DAYS via GraphQL for:", username);
  const token = process.env.GH_TOKEN;

  // GraphQL Query: Yeh GitHub se poochta hai ki pichle saal ka pura calendar do
  const query = `
    query {
      user(login: "${username}") {
        createdAt
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }
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
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Error:", result.errors);
      return;
    }

    const userData = result.data.user;
    const calendar = userData.contributionsCollection.contributionCalendar;

    // 1. Total Contributions (Commits, Issues, PRs sab mila ke)
    const totalContributions = calendar.totalContributions;

    // 2. Public Repos Count
    const publicRepos = userData.repositories.totalCount;

    // 3. Active Days Calculation (Real Logic)
    // Hum har hafte ke har din ko check karenge. Agar contributionCount > 0 hai, toh wo Active Day hai.
    let activeDaysCount = 0;
    
    calendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.contributionCount > 0) {
          activeDaysCount++;
        }
      });
    });

    console.log(`✅ Data Fetched: Repos: ${publicRepos}, Contributions: ${totalContributions}, Active Days: ${activeDaysCount}`);

    const data = {
      public_repos: publicRepos,
      total_contributions: totalContributions,
      active_days: activeDaysCount, // Ab ye REAL active days honge (Green squares count)
    };

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log("✅ data.json updated successfully!");

  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
}

fetchGitHubData();

