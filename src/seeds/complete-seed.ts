import { supabase } from '../lib/supabase';

const clearExistingData = async () => {
  console.log('🧹 Clearing existing data...');

  try {
    // Delete in reverse order due to foreign keys
    await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log('✅ Cleared existing data');
  } catch (error) {
    console.log('⚠️ Some data may not exist yet, continuing...');
  }
};

export const seedCompleteData = async () => {
  console.log('🌱 Starting complete data seeding...');

  try {
    // Clear existing data first
    await clearExistingData();
    // 1. First create a real user in auth.users for blog posts
    console.log('👤 Creating blog author...');
    let authorId = '550e8400-e29b-41d4-a716-446655440000';

    try {
      // Try to create a real user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: 'admin@bhluxury.com',
        password: 'BHLuxury2024!',
        options: {
          data: {
            full_name: 'BH Luxury Admin'
          }
        }
      });

      if (authData?.user?.id) {
        authorId = authData.user.id;
        console.log('✅ Created real auth user for blog posts');
      }
    } catch (error) {
      console.log('⚠️ Using mock author ID for blog posts');
    }

    // 2. Seed Categories
    console.log('📂 Seeding categories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .insert([
        {
          name: 'Phụ Kiện Xì Gà',
          slug: 'phu-kien-xi-ga',
          description: 'Bộ sưu tập phụ kiện xì gà cao cấp: dao cắt, bật lửa, gạt tàn từ các thương hiệu nổi tiếng',
          image_url: '/src/assets/images/pro1.png',
          is_active: true,
          sort_order: 1
        },
        {
          name: 'Single Malts',
          slug: 'single-malts',
          description: 'Whisky single malt nguyên chất từ các vùng nổi tiếng Scotland và thế giới',
          image_url: '/src/assets/images/pro2.png',
          is_active: true,
          sort_order: 2
        },
        {
          name: 'Blended Scotch',
          slug: 'blended-scotch',
          description: 'Whisky Scotch pha trộn tinh tế và cân bằng từ các master blender hàng đầu',
          image_url: '/src/assets/images/pro3.png',
          is_active: true,
          sort_order: 3
        },
        {
          name: 'Rượu Mạnh',
          slug: 'ruou-manh',
          description: 'Bộ sưu tập rượu mạnh cao cấp: cognac, bourbon, rum từ khắp thế giới',
          image_url: '/src/assets/images/pro4.png',
          is_active: true,
          sort_order: 4
        },
        {
          name: 'Rượu Vang',
          slug: 'ruou-vang',
          description: 'Rượu vang đỏ và trắng tuyển chọn từ các vườn nho nổi tiếng',
          image_url: '/src/assets/images/pro5.png',
          is_active: true,
          sort_order: 5
        },
        {
          name: 'Hamper Tết Collection',
          slug: 'hamper-tet-collection',
          description: 'Bộ sưu tập quà tặng Tết sang trọng và ý nghĩa cho doanh nghiệp và gia đình',
          image_url: '/src/assets/images/pro6.png',
          is_active: true,
          sort_order: 6
        }
      ])
      .select();

    if (catError) throw catError;
    console.log(`✅ Created ${categories.length} categories`);

    // 3. Seed Products with Real Images
    console.log('🛍️ Seeding products with real images...');

    const phuKienCategory = categories.find(cat => cat.slug === 'phu-kien-xi-ga');
    const singleMaltsCategory = categories.find(cat => cat.slug === 'single-malts');
    const blendedCategory = categories.find(cat => cat.slug === 'blended-scotch');
    const ruouManhCategory = categories.find(cat => cat.slug === 'ruou-manh');
    const ruouVangCategory = categories.find(cat => cat.slug === 'ruou-vang');

    const { data: products, error: prodError } = await supabase
      .from('products')
      .insert([
        // Phụ Kiện Xì Gà - Using actual images from PK folder
        {
          name: 'Bộ Phụ Kiện Gốm Bật Lửa & Dao Cắt COHIBA BEHIKE X',
          slug: 'bo-phu-kien-gom-bat-lua-dao-cat-cohiba-behike-x',
          description: 'Bộ phụ kiện xì gà cao cấp bằng gốm sứ với thiết kế tinh xảo, bao gồm bật lửa và dao cắt chuyên dụng từ thương hiệu COHIBA BEHIKE danh tiếng.',
          short_description: 'Bộ phụ kiện xì gà cao cấp COHIBA BEHIKE X',
          brand: 'HABANOS',
          category_id: phuKienCategory?.id,
          sku: 'COHIBA-BEHIKE-X-001',
          price: 14168000,
          stock: 5,
          low_stock_threshold: 2,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/1.png',
          image_gallery: ['/src/assets/images/PK/1.png'],
          specifications: {
            origin: 'Cuba',
            material: 'Premium Ceramic',
            includes: ['Lighter', 'Cutter'],
            brand: 'COHIBA BEHIKE'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 156,
          sales_count: 12,
          average_rating: 4.8,
          rating_count: 8,
          tags: ['cohiba', 'behike', 'luxury', 'ceramic', 'set'],
          meta_title: 'Bộ Phụ Kiện Gốm COHIBA BEHIKE X - Cao Cấp',
          meta_description: 'Bộ phụ kiện xì gà COHIBA BEHIKE X cao cấp bằng gốm với bật lửa và dao cắt chuyên nghiệp'
        },
        {
          name: 'Dao Cắt Xì Gà Hai Lưỡi H.UPMANN',
          slug: 'dao-cat-xi-ga-hai-luoi-h-upmann',
          description: 'Dao cắt xì gà hai lưỡi chính hãng H.UPMANN với độ sắc bén cao và thiết kế ergonomic, đảm bảo cắt sạch và chính xác.',
          short_description: 'Dao cắt hai lưỡi H.UPMANN chính hãng',
          brand: 'HABANOS',
          category_id: phuKienCategory?.id,
          sku: 'HUPMANN-CUTTER-001',
          price: 286000,
          stock: 20,
          low_stock_threshold: 5,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/2.png',
          image_gallery: ['/src/assets/images/PK/2.png'],
          specifications: {
            origin: 'Cuba',
            type: 'Double Blade Cutter',
            material: 'Stainless Steel',
            brand: 'H.UPMANN'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 89,
          sales_count: 34,
          average_rating: 4.6,
          rating_count: 15,
          tags: ['h.upmann', 'cutter', 'double blade', 'steel'],
          meta_title: 'Dao Cắt Xì Gà H.UPMANN - Hai Lưỡi Chính Hãng',
          meta_description: 'Dao cắt xì gà H.UPMANN hai lưỡi với độ sắc bén cao và thiết kế chuyên nghiệp'
        },
        {
          name: 'Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO SNAKE Ashtray',
          slug: 'gat-tan-xi-ga-bang-gom-flor-de-castillo-snake-ashtray',
          description: 'Gạt tàn xì gà bằng gốm cao cấp với thiết kế hình rắn độc đáo từ FLOR DE CASTILLO, là sản phẩm nghệ thuật thực thụ cho người sành điệu.',
          short_description: 'Gạt tàn gốm FLOR DE CASTILLO thiết kế rắn',
          brand: 'FLOR DE CASTILLO',
          category_id: phuKienCategory?.id,
          sku: 'FLORDECASTILLO-SNAKE-001',
          price: 3348000,
          stock: 8,
          low_stock_threshold: 2,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/3.png',
          image_gallery: ['/src/assets/images/PK/3.png'],
          specifications: {
            origin: 'Europe',
            material: 'Premium Ceramic',
            design: 'Snake Pattern',
            capacity: '4 cigars',
            brand: 'FLOR DE CASTILLO'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 234,
          sales_count: 6,
          average_rating: 4.9,
          rating_count: 12,
          tags: ['flor de castillo', 'ashtray', 'ceramic', 'snake', 'art'],
          meta_title: 'Gạt Tàn Gốm FLOR DE CASTILLO SNAKE - Nghệ Thuật',
          meta_description: 'Gạt tàn xì gà bằng gốm FLOR DE CASTILLO với thiết kế rắn độc đáo'
        },
        {
          name: 'Gạt Tàn Xì Gà Bằng Gốm FLOR DE CASTILLO ART Ashtray',
          slug: 'gat-tan-xi-ga-bang-gom-flor-de-castillo-art-ashtray',
          description: 'Gạt tàn xì gà nghệ thuật bằng gốm cao cấp với họa tiết tinh xảo từ FLOR DE CASTILLO, kết hợp hoàn hảo giữa thẩm mỹ và công năng.',
          short_description: 'Gạt tàn nghệ thuật FLOR DE CASTILLO',
          brand: 'FLOR DE CASTILLO',
          category_id: phuKienCategory?.id,
          sku: 'FLORDECASTILLO-ART-001',
          price: 3348000,
          stock: 6,
          low_stock_threshold: 2,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/4.png',
          image_gallery: ['/src/assets/images/PK/4.png'],
          specifications: {
            origin: 'Europe',
            material: 'Premium Ceramic',
            design: 'Artistic Pattern',
            capacity: '4 cigars',
            brand: 'FLOR DE CASTILLO'
          },
          status: 'active',
          is_visible: true,
          is_featured: false,
          is_new: false,
          views: 167,
          sales_count: 4,
          average_rating: 4.7,
          rating_count: 9,
          tags: ['flor de castillo', 'ashtray', 'ceramic', 'art'],
          meta_title: 'Gạt Tàn Gốm FLOR DE CASTILLO ART - Nghệ Thuật',
          meta_description: 'Gạt tàn xì gà nghệ thuật FLOR DE CASTILLO với họa tiết tinh xảo'
        },
        {
          name: 'Gạt Tàn Gốm S.T. Dupont Fender | 006425',
          slug: 'gat-tan-gom-st-dupont-fender-006425',
          description: 'Gạt tàn xì gà cao cấp của S.T. Dupont phiên bản Fender limited edition, sự kết hợp hoàn hảo giữa luxury và rock n roll spirit.',
          short_description: 'Gạt tàn S.T. Dupont Fender Limited Edition',
          brand: 'S.T. DUPONT',
          category_id: phuKienCategory?.id,
          sku: 'STDUPONT-FENDER-006425',
          price: 13996800,
          stock: 3,
          low_stock_threshold: 1,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/PK/5.png',
          image_gallery: ['/src/assets/images/PK/5.png'],
          specifications: {
            origin: 'France',
            material: 'Premium Ceramic',
            collection: 'Fender Limited Edition',
            model: '006425',
            brand: 'S.T. DUPONT'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: true,
          views: 445,
          sales_count: 2,
          average_rating: 5.0,
          rating_count: 3,
          tags: ['st dupont', 'fender', 'limited edition', 'luxury', 'collectible'],
          meta_title: 'Gạt Tàn S.T. Dupont Fender 006425 - Limited Edition',
          meta_description: 'Gạt tàn S.T. Dupont phiên bản Fender limited edition cao cấp'
        },

        // Sample products for other categories
        {
          name: 'Macallan 18 Years Old Sherry Oak',
          slug: 'macallan-18-years-old-sherry-oak',
          description: 'Whisky single malt Macallan 18 năm tuổi với hương vị phong phú và phức tạp từ thùng gỗ sồi Sherry, biểu tượng của whisky Scotland cao cấp.',
          short_description: 'Macallan 18 năm tuổi Sherry Oak',
          brand: 'MACALLAN',
          category_id: singleMaltsCategory?.id,
          sku: 'MACALLAN-18-SHERRY-001',
          price: 12500000,
          compare_price: 15000000,
          stock: 12,
          low_stock_threshold: 3,
          track_quantity: true,
          allow_backorder: false,
          featured_image: '/src/assets/images/SP/1.png',
          image_gallery: ['/src/assets/images/SP/1.png'],
          specifications: {
            origin: 'Scotland',
            age: '18 years',
            abv: '43%',
            cask: 'Sherry Oak',
            volume: '700ml'
          },
          status: 'active',
          is_visible: true,
          is_featured: true,
          is_new: false,
          views: 789,
          sales_count: 23,
          average_rating: 4.9,
          rating_count: 45,
          tags: ['macallan', 'single malt', 'sherry oak', '18 years', 'scotland'],
          meta_title: 'Macallan 18 Years Sherry Oak - Single Malt Whisky',
          meta_description: 'Macallan 18 năm tuổi Sherry Oak - whisky single malt Scotland cao cấp'
        }
      ])
      .select();

    if (prodError) throw prodError;
    console.log(`✅ Created ${products.length} products`);

    // 4. Seed Blog Posts with Real Images (skip if auth failed)
    let blogPosts = [];

    if (authorId !== '550e8400-e29b-41d4-a716-446655440000') {
      console.log('📝 Seeding blog posts with featured images...');

      const { data: blogData, error: blogError } = await supabase
        .from('blog_posts')
        .insert([
        {
          title: 'GẠT TÀN XÌ GÀ CUBA: MÔN ĐỒ SƯU TẦM ĐẮT LỊCH SỬ VÀ ĐẲNG CẤP TRẦM MỸ',
          slug: 'gat-tan-xi-ga-cuba-mon-do-suu-tam-dat-lich-su-va-dang-cap-tram-my',
          excerpt: 'Khám phá những chiếc gạt tàn xì gà Cuba độc đáo - không chỉ là phụ kiện mà còn là tác phẩm nghệ thuật đầy giá trị sưu tầm.',
          content: `
            <h2>Lịch sử gạt tàn xì gà Cuba</h2>
            <p>Gạt tàn xì gà Cuba không chỉ đơn thuần là một phụ kiện hút xì gà, mà còn là biểu tượng của sự sang trọng và đẳng cấp. Từ những năm 1800, các nghệ nhân Cuba đã bắt đầu chế tác những chiếc gạt tàn với thiết kế tinh xảo, phản ánh văn hóa và truyền thống địa phương.</p>

            <h2>Đặc điểm nổi bật</h2>
            <p>Những chiếc gạt tàn xì gà Cuba authentic thường được làm từ:</p>
            <ul>
              <li>Gốm sứ cao cấp với men tráng bóng đặc trưng</li>
              <li>Đá cẩm thạch tự nhiên từ các mỏ địa phương</li>
              <li>Kim loại quý như bạc, đồng được chạm khắc thủ công</li>
              <li>Gỗ quý hiếm được gia công bởi các thầy thợ lành nghề</li>
            </ul>

            <h2>Giá trị sưu tầm</h2>
            <p>Gạt tàn xì gà Cuba vintage có thể có giá trị lên đến hàng chục nghìn đô la, đặc biệt là những mẫu limited edition hoặc được ký tên bởi các nghệ nhân nổi tiếng. Những chiếc gạt tàn từ thời kỳ Pre-Revolution (trước 1959) được xem là những báu vật thực sự.</p>

            <h2>Cách nhận biết gạt tàn Cuba chính hãng</h2>
            <p>Để phân biệt gạt tàn Cuba chính hãng với hàng giả, bạn cần chú ý:</p>
            <ul>
              <li>Chữ ký của nghệ nhân hoặc stamp chính thức</li>
              <li>Chất lượng hoàn thiện và độ tinh xảo</li>
              <li>Nguồn gốc xuất xứ có thể kiểm chứng</li>
              <li>Giá cả phù hợp với thị trường</li>
            </ul>
          `,
          author_id: authorId,
          author_name: 'BH Luxury Cigar Team',
          featured_image: '/src/assets/images/BV/1.png',
          gallery: ['/src/assets/images/BV/1.png'],
          status: 'published',
          tags: ['gạt tàn', 'cuba', 'sưu tầm', 'phụ kiện', 'nghệ thuật'],
          categories: ['Phụ kiện', 'Sưu tầm'],
          views: 1247,
          likes: 89,
          reading_time: 5,
          meta_title: 'Gạt Tàn Xì Gà Cuba - Món Đồ Sưu Tầm Đắt Giá | BH Luxury Cigar',
          meta_description: 'Tìm hiểu về lịch sử, đặc điểm và giá trị sưu tầm của gạt tàn xì gà Cuba authentic tại BH Luxury Cigar.',
          published_at: new Date().toISOString()
        },
        {
          title: 'REVIEW PHU KIỆN XÌ GÀ: CUTTER, BẬT LỬA VÀ HUMIDOR',
          slug: 'review-phu-kien-xi-ga-cutter-bat-lua-va-humidor',
          excerpt: 'Đánh giá chi tiết các loại phụ kiện xì gà thiết yếu: dao cắt, bật lửa và hộp bảo quản humidor cho người mới bắt đầu.',
          content: `
            <h2>Dao cắt xì gà (Cutter) - Công cụ quan trọng nhất</h2>
            <p>Dao cắt là phụ kiện quan trọng nhất khi thưởng thức xì gà. Có 3 loại chính mà bạn nên biết:</p>
            <ul>
              <li><strong>Guillotine Cutter:</strong> Phổ biến nhất, cắt thẳng và sạch, phù hợp với hầu hết các loại xì gà</li>
              <li><strong>V-Cut:</strong> Tạo rãnh chữ V, giữ nguyên cấu trúc đầu xì gà, hút êm hơn</li>
              <li><strong>Punch Cut:</strong> Tạo lỗ tròn nhỏ, hút êm và tập trung hương vị</li>
            </ul>

            <h2>Bật lửa chuyên dụng cho xì gà</h2>
            <p>Bật lửa cho xì gà cần có những đặc điểm sau:</p>
            <ul>
              <li>Ngọn lửa màu xanh (sử dụng gas butane)</li>
              <li>Nhiệt độ cao và ổn định (1300-1500°C)</li>
              <li>Không có mùi ảnh hưởng đến hương vị xì gà</li>
              <li>Thiết kế tiện dụng, dễ cầm nắm</li>
              <li>Khả năng chống gió tốt</li>
            </ul>

            <h2>Humidor - Hộp bảo quản chuyên nghiệp</h2>
            <p>Humidor là không thể thiếu để bảo quản xì gà đúng cách:</p>
            <ul>
              <li>Duy trì độ ẩm lý tưởng 65-75%</li>
              <li>Bảo quản hương vị tự nhiên của xì gà</li>
              <li>Ngăn chặn sâu bọ và nấm mốc</li>
              <li>Tạo môi trường lão hóa lý tưởng</li>
              <li>Kiểm soát nhiệt độ ổn định</li>
            </ul>

            <h2>Lời khuyên cho người mới</h2>
            <p>Nếu bạn mới bắt đầu với xì gà, hãy đầu tư vào bộ phụ kiện cơ bản gồm:</p>
            <ol>
              <li>Dao cắt guillotine chất lượng tốt</li>
              <li>Bật lửa torch butane</li>
              <li>Humidor nhỏ cho 25-50 điếu</li>
              <li>Ẩm kế và bộ điều ẩm</li>
            </ol>
          `,
          author_id: authorId,
          author_name: 'BH Luxury Cigar Team',
          featured_image: '/src/assets/images/BV/2.png',
          gallery: ['/src/assets/images/BV/2.png'],
          status: 'published',
          tags: ['review', 'phụ kiện', 'cutter', 'bật lửa', 'humidor', 'hướng dẫn'],
          categories: ['Review', 'Hướng dẫn'],
          views: 2156,
          likes: 134,
          reading_time: 7,
          meta_title: 'Review Phụ Kiện Xì Gà: Cutter, Bật Lửa và Humidor | BH Luxury Cigar',
          meta_description: 'Đánh giá chi tiết các loại phụ kiện xì gà thiết yếu và cách chọn lựa phù hợp cho người mới bắt đầu.',
          published_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
        ])
        .select();

      if (blogError) {
        console.warn('⚠️ Could not create blog posts:', blogError.message);
      } else {
        blogPosts = blogData || [];
        console.log(`✅ Created ${blogPosts.length} blog posts`);
      }
    } else {
      console.log('⚠️ Skipping blog posts (no valid author)');
    }

    console.log('🎉 Complete data seeding finished successfully!');
    console.log(`📊 Final Summary:`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Products: ${products.length} (with real images)`);
    console.log(`   - Blog Posts: ${blogPosts.length} (with featured images)`);
    console.log(`   - User Profiles: 1 (admin user)`);

    return {
      categories,
      products,
      blogPosts,
      authorId
    };

  } catch (error) {
    console.error('💥 Complete seeding failed:', error);
    throw error;
  }
};

