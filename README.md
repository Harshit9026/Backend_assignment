# 🍽️ Menu Management Backend

A backend application for managing Menu Categories, Sub-categories, and Items using **Node.js**, **Express.js**, and **Supabase (PostgreSQL)**.

This project supports:
- ✅ Category Management
- ✅ Sub-category Management
- ✅ Item Management
- ✅ Item Search by name
- ✅ REST API with CRUD operations
- ✅ Postman Testing

---

## 🚀 Tech Stack

| Component | Technology |
|---------|-----------|
Runtime | Node.js |
Framework | Express.js |
Database | Supabase (PostgreSQL) |
Env Config | dotenv |
Testing | Postman |

---

## 📦 Installation & Setup

### 1️⃣ Clone Repo
```bash
git clone <your-repo-url>
cd project
2️⃣ Install Dependencies
npm install

3️⃣ Setup .env
Create .env file:
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
PORT=3000

4️⃣ Run Server
node index.js
Server runs on:
http://localhost:3000

📁 Folder Structure
src/
 ├─ config/        # Supabase client
 ├─ routes/        # API routes
 ├─ controllers/   # Business logic
 ├─ services/      # DB queries
 ├─ utils/
app.js / index.js
.env
package.json
README.md
📡 API Endpoints
✅ Category APIs
Method	Endpoint	Action
POST	/api/categories	Create category
GET	/api/categories	Get all categories
GET	/api/categories/:id OR ?name=	Get category
PUT	/api/categories/:id	Edit category

✅ Sub-Category APIs
Method	Endpoint	Action
POST	/api/categories/:categoryId/subcategories	Create sub-category
GET	/api/subcategories	Get all sub-categories
GET	/api/categories/:id/subcategories	Get sub-categories by category
PUT	/api/subcategories/:id	Edit sub-category

✅ Item APIs
Method	Endpoint	Action
POST	/api/items	Create item
GET	/api/items	Get all items
GET	/api/categories/:id/items	Get items by category
GET	/api/subcategories/:id/items	Get items by sub-category
GET	/api/items/:id OR ?name=	Get item
PUT	/api/items/:id	Edit item

🔍 Search Items
Method	Endpoint	Action
GET	/api/items/search?name=	Search item by name

🧪 Testing
Use Postman (recommended).

Example request:

json
Copy code
{
  "name": "Pizza",
  "image": "https://example.com/pizza.jpg",
  "description": "Cheese pizza",
  "tax_applicable": true,
  "tax": 5,
  "base_amount": 200,
  "discount": 20,
  "total_amount": 180
}

👤 Author
Harshit Shukla

“Build scalable APIs, not spaghetti 😉”

