const supabase = require('../config/supabase');

const createItem = async (req, res) => {
  try {
    const {
      category_id,
      subcategory_id,
      name,
      image,
      description,
      tax_applicability,
      tax,
      base_amount,
      discount
    } = req.body;

    if (!category_id || !name || base_amount === undefined) {
      return res.status(400).json({ error: 'Category ID, name, and base amount are required' });
    }

    const discountValue = discount || 0;
    const total_amount = base_amount - discountValue;

    const { data, error } = await supabase
      .from('items')
      .insert([{
        category_id,
        subcategory_id: subcategory_id || null,
        name,
        image,
        description,
        tax_applicability: tax_applicability || false,
        tax: tax || 0,
        base_amount,
        discount: discountValue,
        total_amount
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Item created successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*, categories(name), subcategories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const { data, error } = await supabase
      .from('items')
      .select('*, categories(name), subcategories(name)')
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

const getItemsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    const { data, error } = await supabase
      .from('items')
      .select('*, categories(name), subcategories(name)')
      .eq('subcategory_id', subcategoryId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getItemByIdOrName = async (req, res) => {
  try {
    const { identifier } = req.params;

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase.from('items').select('*, categories(name), subcategories(name)');

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
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchItemsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Search name parameter is required' });
    }

    const { data, error } = await supabase
      .from('items')
      .select('*, categories(name), subcategories(name)')
      .ilike('name', `%${name}%`)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      image,
      description,
      tax_applicability,
      tax,
      base_amount,
      discount
    } = req.body;

    const { data: existingItem } = await supabase
      .from('items')
      .select('base_amount, discount')
      .eq('id', id)
      .maybeSingle();

    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (image !== undefined) updates.image = image;
    if (description !== undefined) updates.description = description;
    if (tax_applicability !== undefined) updates.tax_applicability = tax_applicability;
    if (tax !== undefined) updates.tax = tax;

    const newBaseAmount = base_amount !== undefined ? base_amount : existingItem.base_amount;
    const newDiscount = discount !== undefined ? discount : existingItem.discount;

    if (base_amount !== undefined) updates.base_amount = base_amount;
    if (discount !== undefined) updates.discount = discount;
    updates.total_amount = newBaseAmount - newDiscount;

    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Item updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubcategory,
  getItemByIdOrName,
  searchItemsByName,
  updateItem
};
