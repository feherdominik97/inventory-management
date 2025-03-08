# Inventory manager

## 🚀 Overview
Inventory manager with optimistic updates.

## 🛠️ Technologies Used
- Nuxt 3
- SQLite
- TailwindCSS
- Pinia

## 📦 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/feherdominik97/inventory-manager.git
   cd inventory-manager
   npm i
   node setupDatabase.js
   npm run dev
   
2. Click here:
   http://localhost:3000/

## Process of development

- I went with a data table design. I tried to make the app look nice regardless of the number fo columns. 
- My idea of resolving update conflicts was asking the user whether they wanted to force their update anyway or not.
- I was a bit bolder with the AI on the server side, but I tried to write as much code as I could by myself on the frontend.
- First I planned the design, I implemented it then I planned the logic of the app.
- I was considering TypeScript and JavaScript as the script language, but I went with JS, because it was a more comfortable solution for an interview task.
- After I created the database and the REST API for the task, I wrote all the functions as it was a pessimistic solution.
- Then I kind of converted it into the optimistic update.

### Pros of solution:

- My idea of a warning modal is good in a situation when we want to make sure that the user doesn't miss the conflicts of the updates.
- For usages where are no room for errors from users.

### Cons of solution:

- It can be annoying if someone uses it in longer periods.

### Possible improvements:

- Instead of a modal maybe there could be just a force button at the end of the row. (?)
- Refreshing the data automatically in periods.
- Tests.
- Documentation.
- Responsive UI.



