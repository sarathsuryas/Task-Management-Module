
---

# ▶️ How to Run the Project

Follow the steps below to set up and run the application locally.

---

## 1️⃣ Prerequisites

Make sure the following are installed on your system:

* **Node.js (LTS recommended – v18 or higher)**
* **npm** (comes with Node.js)
* **Angular CLI (v20 compatible)**

Check versions:

```bash
node -v
npm -v
ng version
```

If Angular CLI is not installed:

```bash
npm install -g @angular/cli
```

---

## 2️⃣ Clone the Repository

```bash
git clone https://github.com/sarathsuryas/Task-Management-Module
cd Task-management-module
```

---

## 3️⃣ Install Dependencies

Run:

```bash
npm install
```

This will install:

* Angular dependencies
* MobX
* ngx-quill
* FullCalendar
* Tailwind CSS
* Other required libraries

---

## 4️⃣ Start Development Server

```bash
ng serve
```

Or with automatic browser open:

```bash
ng serve --open
```

---

## 5️⃣ Access the Application

Open your browser and navigate to:

```
http://localhost:4200
```

---

# 📁 Data Source

Tasks are loaded from:

```
src/assets/data/tasks.json
```

If you modify the JSON file:

* Restart the development server
* Or refresh the browser

---

# 🧹 If You Face Issues

### Clear Node Modules

```bash
rm -rf node_modules
npm install
```

### Clear Angular Cache

```bash
ng cache clean
```

Then run again:

```bash
ng serve
```

---

# 🏗️ Build for Production

To generate a production build:

```bash
ng build
```

Output will be available inside:

```
dist/
```

---

# 🧠 Notes

* This project uses Angular 20 standalone architecture.
* No external APIs are used.
* Data is loaded via HttpClient from local JSON.
* MobX manages application state.
* Calendar integration uses FullCalendar.
* Rich text editor is powered by ngx-quill.

---

