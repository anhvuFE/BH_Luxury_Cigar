import { supabase } from '../lib/supabase';

export const seedSimpleData = async () => {
  console.log('🌱 Seeding simple data...');

  try {
    // Seed categories first
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .insert([
        {
          name: 'Phụ Kiện Xì Gà',
          slug: 'phu-kien-xi-ga',
          description: 'Bộ sưu tập phụ kiện xì gà cao cấp',
          is_active: true,
          sort_order: 1
        },
        {
          name: 'Whisky',
          slug: 'whisky',
          description: 'Bộ sưu tập whisky cao cấp',
          is_active: true,
          sort_order: 2
        }
      ])
      .select();

    if (catError) throw catError;
    console.log(`✅ Created ${categories.length} categories`);

    // Seed products
    const phuKienCategory = categories.find(cat => cat.slug === 'phu-kien-xi-ga');
    const whiskyCategory = categories.find(cat => cat.slug === 'whisky');

    const { data: products, error: prodError } = await supabase
      .from('products')
      .insert([
        {
          name: 'Bộ Phụ Kiện Gốm Bật Lửa & Dao Cắt COHIBA BEHIKE X',
          slug: 'bo-phu-kien-gom-bat-lua-dao-cat-cohiba-behike-x',
          description: 'Bộ phụ kiện xì gà cao cấp bằng gốm sứ với thiết kế tinh xảo',
          brand: 'HABANOS',
          category_id: phuKienCategory?.id,
          sku: 'COHIBA-BEHIKE-X-001',
          price: 14168000,
          stock: 5,
          low_stock_threshold: 2,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/1.png',
          specifications: {
            origin: 'Cuba',
            material: 'Ceramic'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 0,
          sales_count: 0,
          average_rating: 0,
          rating_count: 0,
          tags: ['cohiba', 'behike', 'luxury']
        },
        {
          name: 'Dao Cắt Xì Gà Hai Lưỡi H.UPMANN',
          slug: 'dao-cat-xi-ga-hai-luoi-h-upmann',
          description: 'Dao cắt xì gà hai lưỡi chính hãng H.UPMANN',
          brand: 'HABANOS',
          category_id: phuKienCategory?.id,
          sku: 'HUPMANN-CUTTER-001',
          price: 286000,
          stock: 20,
          low_stock_threshold: 5,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/2.png',
          specifications: {
            origin: 'Cuba',
            type: 'Double Blade Cutter'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 0,
          sales_count: 0,
          average_rating: 0,
          rating_count: 0,
          tags: ['h.upmann', 'cutter']
        },
        {
          name: 'Macallan 18 Years Old',
          slug: 'macallan-18-years-old',
          description: 'Whisky single malt Macallan 18 năm tuổi với hương vị phong phú',
          brand: 'MACALLAN',
          category_id: whiskyCategory?.id,
          sku: 'MACALLAN-18-001',
          price: 12500000,
          compare_price: 15000000,
          stock: 12,
          low_stock_threshold: 3,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/whisky/macallan-18.jpg',
          specifications: {
            origin: 'Scotland',
            age: '18 years',
            abv: '43%'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 0,
          sales_count: 0,
          average_rating: 0,
          rating_count: 0,
          tags: ['macallan', 'single malt', '18 years']
        }
      ])
      .select();

    if (prodError) throw prodError;
    console.log(`✅ Created ${products.length} products`);

    console.log('🎉 Simple seeding completed successfully!');
    return { categories, products };

  } catch (error) {
    console.error('💥 Seeding failed:', error);
    throw error;
  }
};

export default seedSimpleData;