import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type CategoryInsert = Database['public']['Tables']['categories']['Insert'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];

export const seedCategories = async () => {
  console.log('🌱 Seeding categories...');

  const categories: CategoryInsert[] = [
    {
      name: 'Phụ Kiện Xì Gà',
      slug: 'phu-kien-xi-ga',
      description: 'Bộ sưu tập phụ kiện xì gà cao cấp: dao cắt, bật lửa, gạt tàn...',
      image_url: '/src/assets/images/pro1.png',
      is_active: true,
      sort_order: 1
    },
    {
      name: 'Single Malts',
      slug: 'single-malts',
      description: 'Whisky single malt nguyên chất từ các vùng nổi tiếng',
      image_url: '/src/assets/images/pro2.png',
      is_active: true,
      sort_order: 2
    },
    {
      name: 'Blended Scotch',
      slug: 'blended-scotch',
      description: 'Whisky Scotch pha trộn tinh tế và cân bằng',
      image_url: '/src/assets/images/pro3.png',
      is_active: true,
      sort_order: 3
    },
    {
      name: 'Rượu Mạnh',
      slug: 'ruou-manh',
      description: 'Bộ sưu tập rượu mạnh cao cấp từ khắp thế giới',
      image_url: '/src/assets/images/pro4.png',
      is_active: true,
      sort_order: 4
    },
    {
      name: 'Rượu Vang',
      slug: 'ruou-vang',
      description: 'Rượu vang đỏ và trắng từ các vườn nho nổi tiếng',
      image_url: '/src/assets/images/pro5.png',
      is_active: true,
      sort_order: 5
    },
    {
      name: 'Hamper Tết Collection',
      slug: 'hamper-tet-collection',
      description: 'Bộ sưu tập quà tặng Tết sang trọng và ý nghĩa',
      image_url: '/src/assets/images/pro6.png',
      is_active: true,
      sort_order: 6
    }
  ];

  const { data, error } = await supabase
    .from('categories')
    .insert(categories)
    .select();

  if (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }

  console.log(`✅ Successfully seeded ${data.length} categories`);
  return data;
};

export const seedProducts = async (categories: { id: string; slug: string; name: string }[]) => {
  console.log('🌱 Seeding products...');

  const phuKienCategory = categories.find(cat => cat.slug === 'phu-kien-xi-ga');
  const singleMaltsCategory = categories.find(cat => cat.slug === 'single-malts');
  const blendedCategory = categories.find(cat => cat.slug === 'blended-scotch');

  const products: ProductInsert[] = [
    // Phụ kiện xì gà
    {
      name: 'Bộ Phụ Kiện Gốm Bật Lửa & Dao Cắt COHIBA BEHIKE X',
      slug: 'bo-phu-kien-gom-bat-lua-dao-cat-cohiba-behike-x',
      description: 'Bộ phụ kiện xì gà cao cấp bằng gốm sứ với thiết kế tinh xảo, bao gồm bật lửa và dao cắt chuyên dụng.',
      brand: 'HABANOS',
      category_id: phuKienCategory?.id || '',
      sku: 'COHIBA-BEHIKE-X-001',
      price: 14168000,
      stock: 5,
      low_stock_threshold: 2,
      track_quantity: true,
      allow_backorder: false,
      featured_image: '/src/assets/images/PK/1.png',
      image_gallery: [],
      videos: [],
      specifications: {
        origin: 'Cuba',
        material: 'Ceramic',
        includes: ['Lighter', 'Cutter']
      },
      status: 'active',
      is_visible: true,
      is_featured: true,
      is_new: false,
      views: 0,
      sales_count: 0,
      average_rating: 0,
      rating_count: 0,
      tags: ['cohiba', 'behike', 'luxury', 'ceramic']
    },
    {
      name: 'Dao Cắt Xì Gà Hai Lưỡi H.UPMANN',
      slug: 'dao-cat-xi-ga-hai-luoi-h-upmann',
      description: 'Dao cắt xì gà hai lưỡi chính hãng H.UPMANN với độ sắc bén cao và thiết kế ergonomic.',
      brand: 'HABANOS',
      category_id: phuKienCategory?.id || '',
      price: 286000,
      stock: 20,
      image_url: '/src/assets/images/PK/2.png',
      specifications: {
        origin: 'Cuba',
        type: 'Double Blade Cutter',
        material: 'Stainless Steel'
      },
      is_featured: false,
      is_active: true,
      tags: ['h.upmann', 'cutter', 'double blade']
    },
    {
      name: 'Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO SNAKE Ashtray',
      slug: 'gat-tan-xi-ga-bang-gom-flor-de-castillo-snake-ashtray',
      description: 'Gạt tàn xì gà bằng gốm cao cấp với thiết kế hình rắn độc đáo, sản phẩm nghệ thuật thực thụ.',
      brand: 'FLOR DE CASTILLO',
      category_id: phuKienCategory?.id || '',
      price: 3348000,
      stock: 8,
      image_url: '/src/assets/images/PK/3.png',
      specifications: {
        origin: 'Europe',
        material: 'Premium Ceramic',
        design: 'Snake Pattern',
        capacity: '4 cigars'
      },
      is_featured: true,
      is_active: true,
      tags: ['flor de castillo', 'ashtray', 'ceramic', 'snake', 'art']
    },
    {
      name: 'Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO ART Ashtray',
      slug: 'gat-tan-xi-ga-bang-gom-flor-de-castillo-art-ashtray',
      description: 'Gạt tàn xì gà nghệ thuật bằng gốm cao cấp với họa tiết tinh xảo, kết hợp hoàn hảo giữa thẩm mỹ và công năng.',
      brand: 'FLOR DE CASTILLO',
      category_id: phuKienCategory?.id || '',
      price: 3348000,
      stock: 6,
      image_url: '/src/assets/images/PK/4.png',
      specifications: {
        origin: 'Europe',
        material: 'Premium Ceramic',
        design: 'Artistic Pattern',
        capacity: '4 cigars'
      },
      is_featured: false,
      is_active: true,
      tags: ['flor de castillo', 'ashtray', 'ceramic', 'art']
    },
    {
      name: 'Gạt Tàn Gốm S.T. Dupont Fender | 006425',
      slug: 'gat-tan-gom-st-dupont-fender-006425',
      description: 'Gạt tàn xì gà cao cấp của S.T. Dupont phiên bản Fender, sự kết hợp hoàn hảo giữa luxury và rock n roll.',
      brand: 'S.T. DUPONT',
      category_id: phuKienCategory?.id || '',
      price: 13996800,
      stock: 3,
      image_url: '/src/assets/images/PK/5.png',
      specifications: {
        origin: 'France',
        material: 'Premium Ceramic',
        collection: 'Fender Limited Edition',
        model: '006425'
      },
      is_featured: true,
      is_active: true,
      tags: ['st dupont', 'fender', 'limited edition', 'luxury']
    },

    // Whisky Single Malts
    {
      name: 'Macallan 18 Years Old',
      slug: 'macallan-18-years-old',
      description: 'Whisky single malt Macallan 18 năm tuổi với hương vị phong phú và phức tạp từ thùng gỗ sồi Sherry.',
      brand: 'MACALLAN',
      category_id: singleMaltsCategory?.id || '',
      price: 12500000,
      original_price: 15000000,
      stock: 12,
      image_url: '/src/assets/images/whisky/macallan-18.jpg',
      specifications: {
        origin: 'Scotland',
        age: '18 years',
        abv: '43%',
        cask: 'Sherry Oak',
        volume: '700ml'
      },
      is_featured: true,
      is_active: true,
      tags: ['macallan', 'single malt', 'sherry oak', '18 years']
    },
    {
      name: 'Glenfiddich 21 Year Old',
      slug: 'glenfiddich-21-year-old',
      description: 'Single malt Scotch whisky Glenfiddich 21 năm với quy trình ủ đặc biệt trong thùng Rum Caribbean.',
      brand: 'GLENFIDDICH',
      category_id: singleMaltsCategory?.id || '',
      price: 8900000,
      stock: 8,
      image_url: '/src/assets/images/whisky/glenfiddich-21.jpg',
      specifications: {
        origin: 'Scotland',
        age: '21 years',
        abv: '40%',
        cask: 'Caribbean Rum',
        volume: '700ml'
      },
      is_featured: false,
      is_active: true,
      tags: ['glenfiddich', 'single malt', 'caribbean rum', '21 years']
    },

    // Blended Scotch
    {
      name: 'Johnnie Walker Blue Label',
      slug: 'johnnie-walker-blue-label',
      description: 'Whisky pha trộn hàng đầu thế giới với hương vị mềm mại và phức tạp từ những malt hiếm có.',
      brand: 'JOHNNIE WALKER',
      category_id: blendedCategory?.id || '',
      price: 5200000,
      stock: 15,
      image_url: '/src/assets/images/whisky/johnnie-walker-blue.jpg',
      specifications: {
        origin: 'Scotland',
        type: 'Blended Scotch',
        abv: '40%',
        volume: '700ml'
      },
      is_featured: true,
      is_active: true,
      tags: ['johnnie walker', 'blue label', 'blended scotch', 'premium']
    }
  ];

  const { data, error } = await supabase
    .from('products')
    .insert(products)
    .select();

  if (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }

  console.log(`✅ Successfully seeded ${data.length} products`);
  return data;
};

export const seedBlogPosts = async () => {
  console.log('🌱 Seeding blog posts...');

  // First create a user profile for the author
  const { data: authorData, error: authorError } = await supabase
    .from('user_profiles')
    .insert({
      id: crypto.randomUUID(),
      email: 'admin@bhluxurycigar.com',
      full_name: 'BH Luxury Cigar Team'
    })
    .select()
    .single();

  if (authorError) {
    console.error('❌ Error creating author:', authorError);
    throw authorError;
  }

  const blogPosts: BlogPostInsert[] = [
    {
      title: 'GẠT TÀN XÌ GÀ CUBA: MÔN ĐỒ SƯU TẦM ĐẮT LỊCH SỬ VÀ ĐẲNG CẤP TRẦM MỸ',
      slug: 'gat-tan-xi-ga-cuba-mon-do-suu-tam-dat-lich-su-va-dang-cap-tram-my',
      excerpt: 'Khám phá những chiếc gạt tàn xì gà Cuba độc đáo - không chỉ là phụ kiện mà còn là tác phẩm nghệ thuật đầy giá trị.',
      content: `
        <h2>Lịch sử gạt tàn xì gà Cuba</h2>
        <p>Gạt tàn xì gà Cuba không chỉ đơn thuần là một phụ kiện hút xì gà, mà còn là biểu tượng của sự sang trọng và đẳng cấp. Từ những năm 1800, các nghệ nhân Cuba đã bắt đầu chế tác những chiếc gạt tàn với thiết kế tinh xảo, phản ánh văn hóa và truyền thống địa phương.</p>

        <h2>Đặc điểm nổi bật</h2>
        <p>Những chiếc gạt tàn xì gà Cuba authentic thường được làm từ:</p>
        <ul>
          <li>Gốm sứ cao cấp với men tráng bóng</li>
          <li>Đá cẩm thạch tự nhiên</li>
          <li>Kim loại quý như bạc, đồng</li>
          <li>Gỗ quý hiếm được gia công thủ công</li>
        </ul>

        <h2>Giá trị sưu tầm</h2>
        <p>Gạt tàn xì gà Cuba vintage có thể có giá trị lên đến hàng chục nghìn đô la, đặc biệt là những mẫu limited edition hoặc được ký tên bởi các nghệ nhân nổi tiếng.</p>
      `,
      author_id: authorData.id,
      featured_image: '/src/assets/images/BV/1.png',
      status: 'published',
      is_featured: true,
      tags: ['gạt tàn', 'cuba', 'sưu tầm', 'phụ kiện'],
      meta_title: 'Gạt Tàn Xì Gà Cuba - Món Đồ Sưu Tầm Đắt Giá',
      meta_description: 'Tìm hiểu về lịch sử, đặc điểm và giá trị sưu tầm của gạt tàn xì gà Cuba authentic.',
      published_at: new Date().toISOString()
    },
    {
      title: 'REVIEW PHU KIỆN XÌ GÀ: CUTTER, BẬT LỬA VÀ HUMIDOR',
      slug: 'review-phu-kien-xi-ga-cutter-bat-lua-va-humidor',
      excerpt: 'Đánh giá chi tiết các loại phụ kiện xì gà thiết yếu: dao cắt, bật lửa và hộp bảo quản.',
      content: `
        <h2>Dao cắt xì gà (Cutter)</h2>
        <p>Dao cắt là phụ kiện quan trọng nhất khi thưởng thức xì gà. Có 3 loại chính:</p>
        <ul>
          <li><strong>Guillotine Cutter:</strong> Phổ biến nhất, cắt thẳng và sạch</li>
          <li><strong>V-Cut:</strong> Tạo rãnh chữ V, giữ nguyên cấu trúc</li>
          <li><strong>Punch Cut:</strong> Tạo lỗ tròn nhỏ, hút êm</li>
        </ul>

        <h2>Bật lửa xì gà</h2>
        <p>Bật lửa chuyên dụng cho xì gà cần có:</p>
        <ul>
          <li>Ngọn lửa màu xanh (butane)</li>
          <li>Nhiệt độ cao và ổn định</li>
          <li>Không có mùi ảnh hưởng đến hương vị</li>
          <li>Thiết kế tiện dụng</li>
        </ul>

        <h2>Humidor - Hộp bảo quản</h2>
        <p>Humidor giúp:</p>
        <ul>
          <li>Duy trì độ ẩm 65-75%</li>
          <li>Bảo quản hương vị tự nhiên</li>
          <li>Ngăn chặn sâu bọ và nấm mốc</li>
          <li>Tạo môi trường lão hóa lý tưởng</li>
        </ul>
      `,
      author_id: authorData.id,
      featured_image: '/src/assets/images/BV/2.png',
      status: 'published',
      is_featured: true,
      tags: ['review', 'phụ kiện', 'cutter', 'bật lửa', 'humidor'],
      meta_title: 'Review Phụ Kiện Xì Gà: Cutter, Bật Lửa và Humidor',
      meta_description: 'Đánh giá chi tiết các loại phụ kiện xì gà thiết yếu và cách chọn lựa phù hợp.',
      published_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    }
  ];

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(blogPosts)
    .select();

  if (error) {
    console.error('❌ Error seeding blog posts:', error);
    throw error;
  }

  console.log(`✅ Successfully seeded ${data.length} blog posts`);
  return data;
};

export const seedDatabase = async () => {
  console.log('🚀 Starting database seeding...');

  try {
    // Seed in order due to foreign key constraints
    const categories = await seedCategories();
    const products = await seedProducts(categories);
    const blogPosts = await seedBlogPosts();

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Blog Posts: ${blogPosts.length}`);

    return {
      categories,
      products,
      blogPosts
    };
  } catch (error) {
    console.error('💥 Database seeding failed:', error);
    throw error;
  }
};

// Export individual functions for selective seeding
export { seedDatabase as default };