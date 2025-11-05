const supabase = require('../config/supabase');

const createCategory = async (req, res) => {
  try {
    const { name, image, description, tax_applicability, tax, tax_type } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name,
        image,
        description,
        tax_applicability: tax_applicability || false,
        tax: tax || 0,
        tax_type
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Category created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategoryByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase.from('categories').select('*');

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
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, tax_applicability, tax, tax_type } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (image !== undefined) updates.image = image;
    if (description !== undefined) updates.description = description;
    if (tax_applicability !== undefined) updates.tax_applicability = tax_applicability;
    if (tax !== undefined) updates.tax = tax;
    if (tax_type !== undefined) updates.tax_type = tax_type;

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Category updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory
};
