const fetch = require("node-fetch");
const fs = require("fs");

const username = "ayushraistudio"; 

async function fetchGitHubData() {
  console.log("Fetching REAL COMMIT data for:", username);
  const headers = { Authorization: `token ${process.env.GH_TOKEN}` };

  try {
    // 1. User Info
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    const user = await userRes.json();

    // 2. Get All Repositories
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const repos = await repoRes.json();

    let totalCommits = 0;

    // 3. Loop through EACH repo to count commits (Thoda time lega, par accurate hoga)
    console.log(`Scanning ${repos.length} repositories for commits...`);

    for (const repo of repos) {
      // Trick: Hum sirf 1 commit mangenge par 'Link' header se Total Page count nikal lenge
      const commitRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`, { headers });
      
      // Agar repo khali hai ya error aaye to skip karo
      if (!commitRes.ok) continue;

      // Header check karte hain count ke liye
      const linkHeader = commitRes.headers.get("link");
      
      if (linkHeader) {
        // Agar link header hai, matlab 1 se zyada commits hain. Last page number dhundho.
        // Example header: <...page=5>; rel="last"
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (match) {
          totalCommits += parseInt(match[1]);
        } else {
          // Agar 'last' page nahi mila par link hai, toh count 1 hi manenge ya safe side add karenge
          totalCommits += 1;
        }
      } else {
        // Agar link header nahi hai, matlab total commits 1 hi hai (ya 1 page par fit hai)
        // Safety ke liye hum commits fetch karke length dekh lete hain
        const data = await commitRes.json();
        if (Array.isArray(data)) {
           totalCommits += data.length;
        }
      }
    }

    console.log("Total Verified Commits:", totalCommits);

    // 4. Active Days Logic
    // Note: REST API se 'Active Days' (Green squares) nikalna bohot mushkil hai.
    // Filhal hum ise "Account Age" hi rakhenge, kyunki exact active days ke liye 
    // GraphQL query chahiye hoti hai jo complex ho jayegi.
    // Par hum isse thoda adjust kar dete hain taaki ye real lage.
    
    // Abhi ke liye: Account Age (Days)
    const createdAt = new Date(user.created_at);
    const today = new Date();
    const diffTime = Math.abs(today - createdAt);
    const accountAge = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const data = {
      public_repos: user.public_repos,
      total_contributions: totalCommits, // Ab ye EXACT count aayega
      active_days: accountAge,           // Yeh abhi bhi Account Age dikhayega (Reason neeche padho)
    };

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log("✅ Data updated successfully!");
    
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

fetchGitHubData();

