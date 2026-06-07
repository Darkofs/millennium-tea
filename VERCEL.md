# How to Deploy to Vercel 🚀

Vercel is the easiest, fastest, and most popular hosting platform for Next.js applications. It is 100% free for personal use and includes free SSL security.

Here are the step-by-step instructions to get your website online:

---

### Step 1: Install the Vercel Command Line Interface (CLI)
Open your terminal (PowerShell, Command Prompt, or VS Code terminal) in your project directory (`c:\Users\SIDHU\OneDrive\Desktop\Spices`) and run:
```bash
npm install -g vercel
```
*(This installs Vercel globally on your system so you can use it anytime).*

---

### Step 2: Deploy your Website
Run the following command in the same terminal:
```bash
vercel
```

Vercel will prompt you with a few setup questions. Here is how to answer them:
1. **Set up and deploy “c:\Users\SIDHU\OneDrive\Desktop\Spices”?**
   - Type `y` and press **Enter**.
2. **Log in to Vercel:**
   - If it is your first time, it will prompt you to log in. Select **Continue with Email** or your preferred login method. It will open your web browser. Once you log in or sign up, return to the terminal.
3. **Which scope do you want to deploy to?**
   - Press **Enter** (selects your personal username).
4. **Link to existing project?**
   - Type `n` and press **Enter** (since this is a new project).
5. **What’s your project’s name?**
   - Press **Enter** (it will default to `spices`).
6. **In which directory is your code located?**
   - Press **Enter** (defaults to `./`).
7. **Want to modify these settings? [y/N]**
   - Type `n` and press **Enter** (Vercel automatically detects Next.js settings).

Vercel will upload your files and build your site. In about 30 seconds, it will give you a **Preview URL** (e.g., `spices-username.vercel.app`).

---

### Step 3: Publish to Production (Final Step)
Once the preview looks good, publish it live to the web by running:
```bash
vercel --prod
```
This will generate your final **Production URL** (a clean, permanent link you can share with anyone).

---

### 💡 Future Updates:
Whenever you edit your code or images in the future and want to update your live website, simply run:
```bash
vercel --prod
```
This will automatically rebuild and update your live website instantly.
