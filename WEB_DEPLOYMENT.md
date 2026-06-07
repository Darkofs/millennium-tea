# Web Deployment Guide 🌐

Here is how to deploy your website entirely using your web browser, without typing any commands.

---

## Method 1: Netlify Drag-and-Drop (Easiest - No Git required)
You can deploy your built website in seconds by simply uploading the folder through your browser.

1. **Build the site**: Make sure you have the latest build. If you have built it recently, you will see a folder named `out` in your project directory (`c:\Users\SIDHU\OneDrive\Desktop\Spices\out`).
2. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)** in your web browser.
3. Open your file explorer, find the **`out`** folder, and drag-and-drop it into the box on the Netlify web page.
4. Netlify will upload the files and create a live website link for you in seconds. You can then sign up for a free account to keep the link permanently and add a custom domain.

---

## Method 2: Vercel Web Deployment (Via GitHub)
This is the standard professional way to host websites. Whenever you update your code and push it to GitHub, Vercel will automatically update your website!

### Step 1: Create a GitHub Repository
1. Log in to **[github.com](https://github.com/)** (create a free account if you don't have one).
2. Click **New Repository** at the top right.
3. Give it a name (e.g., `millennium-tea`), keep it Public or Private, and click **Create repository**.
4. Upload your project files to this repository (excluding the `node_modules` and `.next` folders).

### Step 2: Import to Vercel Web Dashboard
1. Go to **[vercel.com](https://vercel.com/)** and log in or create a free account.
2. Click the **Add New...** button and select **Project**.
3. Under "Import Git Repository", select **GitHub** and connect your GitHub account.
4. Locate your repository (e.g., `millennium-tea`) and click the **Import** button.
5. In the configuration page, leave everything as default:
   - Vercel will automatically detect **Next.js** as your framework.
6. Click the **Deploy** button.
7. Vercel's web interface will build your site and give you your live domain (e.g., `millennium-tea.vercel.app`) in under a minute!
