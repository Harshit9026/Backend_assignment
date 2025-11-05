# Menu Management API Documentation

## Base URL
```
http://localhost:3000/api
```

## Overview
This API allows you to manage a hierarchical menu structure consisting of Categories, Subcategories, and Items.

---

## Categories

### 1. Create Category
**POST** `/categories`

**Request Body:**
```json
{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "Hot and cold beverages",
  "tax_applicability": true,
  "tax": 5,
  "tax_type": "percentage"
}
```

**Response:** `201 Created`
```json
{
  "message": "Category created successfully",
  "data": {
    "id": "uuid",
    "name": "Beverages",
    "image": "https://example.com/beverages.jpg",
    "description": "Hot and cold beverages",
    "tax_applicability": true,
    "tax": 5,
    "tax_type": "percentage",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

### 2. Get All Categories
**GET** `/categories`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Beverages",
      "image": "https://example.com/beverages.jpg",
      "description": "Hot and cold beverages",
      "tax_applicability": true,
      "tax": 5,
      "tax_type": "percentage",
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ]
}
```

### 3. Get Category by ID or Name
**GET** `/categories/:identifier`

**Parameters:**
- `identifier` - Category UUID or name

**Example:**
```
GET /categories/Beverages
GET /categories/550e8400-e29b-41d4-a716-446655440000
```

**Response:** `200 OK`
```json
{
  "data": {
    "id": "uuid",
    "name": "Beverages",
    "image": "https://example.com/beverages.jpg",
    "description": "Hot and cold beverages",
    "tax_applicability": true,
    "tax": 5,
    "tax_type": "percentage",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

### 4. Edit Category
**PUT** `/categories/:id`

**Request Body:**
```json
{
  "name": "Updated Beverages",
  "description": "All types of beverages",
  "tax": 7
}
```

**Response:** `200 OK`
```json
{
  "message": "Category updated successfully",
  "data": {
    "id": "uuid",
    "name": "Updated Beverages",
    "image": "https://example.com/beverages.jpg",
    "description": "All types of beverages",
    "tax_applicability": true,
    "tax": 7,
    "tax_type": "percentage",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

---

## Subcategories

### 1. Create Subcategory
**POST** `/subcategories`

**Request Body:**
```json
{
  "category_id": "uuid",
  "name": "Coffee",
  "image": "https://example.com/coffee.jpg",
  "description": "Various coffee options",
  "tax_applicability": true,
  "tax": 5
}
```

**Note:** If `tax_applicability` and `tax` are not provided, they default to the parent category's values.

**Response:** `201 Created`
```json
{
  "message": "Subcategory created successfully",
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "name": "Coffee",
    "image": "https://example.com/coffee.jpg",
    "description": "Various coffee options",
    "tax_applicability": true,
    "tax": 5,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

### 2. Get All Subcategories
**GET** `/subcategories`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "name": "Coffee",
      "image": "https://example.com/coffee.jpg",
      "description": "Various coffee options",
      "tax_applicability": true,
      "tax": 5,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "categories": {
        "name": "Beverages"
      }
    }
  ]
}
```

### 3. Get All Subcategories Under a Category
**GET** `/subcategories/category/:categoryId`

**Parameters:**
- `categoryId` - Category UUID

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "name": "Coffee",
      "image": "https://example.com/coffee.jpg",
      "description": "Various coffee options",
      "tax_applicability": true,
      "tax": 5,
      "created_at": "timestamp",
      "updated_at": "timestamp"
    }
  ]
}
```

### 4. Get Subcategory by ID or Name
**GET** `/subcategories/:identifier`

**Parameters:**
- `identifier` - Subcategory UUID or name

**Response:** `200 OK`
```json
{
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "name": "Coffee",
    "image": "https://example.com/coffee.jpg",
    "description": "Various coffee options",
    "tax_applicability": true,
    "tax": 5,
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "categories": {
      "name": "Beverages"
    }
  }
}
```

### 5. Edit Subcategory
**PUT** `/subcategories/:id`

**Request Body:**
```json
{
  "name": "Premium Coffee",
  "description": "High quality coffee options",
  "tax": 6
}
```

**Response:** `200 OK`
```json
{
  "message": "Subcategory updated successfully",
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "name": "Premium Coffee",
    "image": "https://example.com/coffee.jpg",
    "description": "High quality coffee options",
    "tax_applicability": true,
    "tax": 6,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

---

## Items

### 1. Create Item
**POST** `/items`

**Request Body:**
```json
{
  "category_id": "uuid",
  "subcategory_id": "uuid",
  "name": "Cappuccino",
  "image": "https://example.com/cappuccino.jpg",
  "description": "Classic Italian coffee drink",
  "tax_applicability": true,
  "tax": 5,
  "base_amount": 150,
  "discount": 10
}
```

**Note:**
- `subcategory_id` is optional
- `total_amount` is automatically calculated as `base_amount - discount`
- `discount` defaults to 0 if not provided

**Response:** `201 Created`
```json
{
  "message": "Item created successfully",
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "subcategory_id": "uuid",
    "name": "Cappuccino",
    "image": "https://example.com/cappuccino.jpg",
    "description": "Classic Italian coffee drink",
    "tax_applicability": true,
    "tax": 5,
    "base_amount": 150,
    "discount": 10,
    "total_amount": 140,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

### 2. Get All Items
**GET** `/items`

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "subcategory_id": "uuid",
      "name": "Cappuccino",
      "image": "https://example.com/cappuccino.jpg",
      "description": "Classic Italian coffee drink",
      "tax_applicability": true,
      "tax": 5,
      "base_amount": 150,
      "discount": 10,
      "total_amount": 140,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "categories": {
        "name": "Beverages"
      },
      "subcategories": {
        "name": "Coffee"
      }
    }
  ]
}
```

### 3. Get All Items Under a Category
**GET** `/items/category/:categoryId`

**Parameters:**
- `categoryId` - Category UUID

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "subcategory_id": "uuid",
      "name": "Cappuccino",
      "image": "https://example.com/cappuccino.jpg",
      "description": "Classic Italian coffee drink",
      "tax_applicability": true,
      "tax": 5,
      "base_amount": 150,
      "discount": 10,
      "total_amount": 140,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "categories": {
        "name": "Beverages"
      },
      "subcategories": {
        "name": "Coffee"
      }
    }
  ]
}
```

### 4. Get All Items Under a Subcategory
**GET** `/items/subcategory/:subcategoryId`

**Parameters:**
- `subcategoryId` - Subcategory UUID

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "subcategory_id": "uuid",
      "name": "Cappuccino",
      "image": "https://example.com/cappuccino.jpg",
      "description": "Classic Italian coffee drink",
      "tax_applicability": true,
      "tax": 5,
      "base_amount": 150,
      "discount": 10,
      "total_amount": 140,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "categories": {
        "name": "Beverages"
      },
      "subcategories": {
        "name": "Coffee"
      }
    }
  ]
}
```

### 5. Get Item by ID or Name
**GET** `/items/:identifier`

**Parameters:**
- `identifier` - Item UUID or name

**Response:** `200 OK`
```json
{
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "subcategory_id": "uuid",
    "name": "Cappuccino",
    "image": "https://example.com/cappuccino.jpg",
    "description": "Classic Italian coffee drink",
    "tax_applicability": true,
    "tax": 5,
    "base_amount": 150,
    "discount": 10,
    "total_amount": 140,
    "created_at": "timestamp",
    "updated_at": "timestamp",
    "categories": {
      "name": "Beverages"
    },
    "subcategories": {
      "name": "Coffee"
    }
  }
}
```

### 6. Search Items by Name
**GET** `/items/search?name=cappuccino`

**Query Parameters:**
- `name` - Search term (case-insensitive, partial match)

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "subcategory_id": "uuid",
      "name": "Cappuccino",
      "image": "https://example.com/cappuccino.jpg",
      "description": "Classic Italian coffee drink",
      "tax_applicability": true,
      "tax": 5,
      "base_amount": 150,
      "discount": 10,
      "total_amount": 140,
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "categories": {
        "name": "Beverages"
      },
      "subcategories": {
        "name": "Coffee"
      }
    }
  ]
}
```

### 7. Edit Item
**PUT** `/items/:id`

**Request Body:**
```json
{
  "name": "Grande Cappuccino",
  "description": "Large classic Italian coffee drink",
  "base_amount": 180,
  "discount": 15
}
```

**Note:** `total_amount` is automatically recalculated when `base_amount` or `discount` is updated.

**Response:** `200 OK`
```json
{
  "message": "Item updated successfully",
  "data": {
    "id": "uuid",
    "category_id": "uuid",
    "subcategory_id": "uuid",
    "name": "Grande Cappuccino",
    "image": "https://example.com/cappuccino.jpg",
    "description": "Large classic Italian coffee drink",
    "tax_applicability": true,
    "tax": 5,
    "base_amount": 180,
    "discount": 15,
    "total_amount": 165,
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
}
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request**
```json
{
  "error": "Error message describing what went wrong"
}
```

**404 Not Found**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error message"
}
```

---

## Testing with Postman

1. Start the server: `npm start`
2. Import the endpoints into Postman
3. Create a category first
4. Use the category ID to create subcategories
5. Use category and subcategory IDs to create items
6. Test all GET, PUT, and search endpoints

---

## Database Structure

### Categories
- Standalone table
- Can have multiple subcategories
- Tax settings inherited by subcategories

### Subcategories
- Must belong to a category
- Inherits tax settings from category by default
- Can have multiple items

### Items
- Must belong to a category
- Optionally belongs to a subcategory
- Automatically calculates total amount
