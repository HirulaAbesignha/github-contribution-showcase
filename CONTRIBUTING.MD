# 🤝 Contributing to Ayush Trophy

First of all, thank you for being interested in contributing! This project grows when the community adds their creative touch.

We are specifically looking for new **SVG Themes** to give users more choices.

## 🎨 How to Add a New Theme?

If you have a cool design idea, follow these steps to add it:

### Step 1: Fork and Clone
1. Fork this repository to your account.
2. Clone it to your local machine.

### Step 2: Add Your Theme Code
Open the file `src/generateTrophy.js`. You will find a `themes` object. Add your new theme as a new key-value pair:

```javascript
const themes = {
  neon: `...`,
  cyberpunk: `...`,
  // 🚀 Add your new theme here:
  your_theme_name: `
    <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="800" height="250">
      </svg>
  `
};

