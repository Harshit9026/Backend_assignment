/*
  # Menu Management System Database Schema

  ## Overview
  This migration creates the complete database structure for a menu management system with categories, sub-categories, and items.

  ## 1. New Tables

  ### `categories`
  Main category table for organizing menu items
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, unique, required) - Category name
  - `image` (text) - Image URL
  - `description` (text) - Category description
  - `tax_applicability` (boolean, default: false) - Whether tax applies
  - `tax` (numeric, default: 0) - Tax percentage/amount
  - `tax_type` (text) - Type of tax (e.g., "percentage", "fixed")
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `subcategories`
  Sub-categories under main categories
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Reference to parent category
  - `name` (text, required) - Sub-category name
  - `image` (text) - Image URL
  - `description` (text) - Sub-category description
  - `tax_applicability` (boolean) - Whether tax applies (inherits from category)
  - `tax` (numeric) - Tax percentage/amount (inherits from category)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `items`
  Individual menu items under categories or sub-categories
  - `id` (uuid, primary key) - Unique identifier
  - `category_id` (uuid, foreign key) - Reference to category
  - `subcategory_id` (uuid, foreign key, nullable) - Reference to sub-category (optional)
  - `name` (text, required) - Item name
  - `image` (text) - Image URL
  - `description` (text) - Item description
  - `tax_applicability` (boolean, default: false) - Whether tax applies
  - `tax` (numeric, default: 0) - Tax percentage/amount
  - `base_amount` (numeric, required) - Base price
  - `discount` (numeric, default: 0) - Discount amount
  - `total_amount` (numeric, required) - Final price (base - discount)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## 2. Security
  - Enable Row Level Security (RLS) on all tables
  - Add policies for public read access (suitable for menu viewing)
  - Add policies for authenticated users to create, update, and delete (for admin operations)

  ## 3. Indexes
  - Index on category names for faster searches
  - Index on subcategory names and category relationships
  - Index on item names for search functionality
  - Index on foreign key relationships

  ## 4. Important Notes
  - All monetary values use numeric type for precision
  - Timestamps are automatically managed with triggers
  - Foreign key constraints ensure data integrity
  - Sub-categories are optional (subcategory_id can be null)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  image text,
  description text,
  tax_applicability boolean DEFAULT false,
  tax numeric DEFAULT 0,
  tax_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  image text,
  description text,
  tax_applicability boolean DEFAULT false,
  tax numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  subcategory_id uuid REFERENCES subcategories(id) ON DELETE SET NULL,
  name text NOT NULL,
  image text,
  description text,
  tax_applicability boolean DEFAULT false,
  tax numeric DEFAULT 0,
  base_amount numeric NOT NULL,
  discount numeric DEFAULT 0,
  total_amount numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_name ON subcategories(name);
CREATE INDEX IF NOT EXISTS idx_items_category_id ON items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_subcategory_id ON items(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_subcategories_updated_at ON subcategories;
CREATE TRIGGER update_subcategories_updated_at
  BEFORE UPDATE ON subcategories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_items_updated_at ON items;
CREATE TRIGGER update_items_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for subcategories
CREATE POLICY "Anyone can view subcategories"
  ON subcategories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert subcategories"
  ON subcategories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update subcategories"
  ON subcategories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete subcategories"
  ON subcategories FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for items
CREATE POLICY "Anyone can view items"
  ON items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert items"
  ON items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update items"
  ON items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete items"
  ON items FOR DELETE
  TO authenticated
  USING (true);