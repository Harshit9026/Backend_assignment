const supabase = require('../config/supabase');

const createSubcategory = async (req, res) => {
  try {
    const { category_id, name, image, description, tax_applicability, tax } = req.body;

    if (!category_id || !name) {
      return res.status(400).json({ error: 'Category ID and name are required' });
    }

    const { data: category } = await supabase
      .from('categories')
      .select('tax_applicability, tax')
      .eq('id', category_id)
      .maybeSingle();

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { data, error } = await supabase
      .from('subcategories')
      .insert([{
        category_id,
        name,
        image,
        description,
        tax_applicability: tax_applicability !== undefined ? tax_applicability : category.tax_applicability,
        tax: tax !== undefined ? tax : category.tax
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Subcategory created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSubcategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubcategoryByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase.from('subcategories').select('*, categories(name)');

    if (isUuid) {
      query = query.eq('id', identifier);
    } else {
      query = query.eq('name', identifier);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, tax_applicability, tax } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (image !== undefined) updates.image = image;
    if (description !== undefined) updates.description = description;
    if (tax_applicability !== undefined) updates.tax_applicability = tax_applicability;
    if (tax !== undefined) updates.tax = tax;

    const { data, error } = await supabase
      .from('subcategories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Subcategory updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSubcategory,
  getAllSubcategories,
  getSubcategoriesByCategory,
  getSubcategoryByIdOrName,
  updateSubcategory
};
