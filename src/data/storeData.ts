// Import product images
import siglo6Image from '../assets/images/siglo6.png';
import montecristoImage from '../assets/images/montercristo.png';
import churchillImage from '../assets/images/churchill.png';
import davidoffImage from '../assets/images/davidoff.png';
import arturoImage from '../assets/images/arturo.png';
import padronImage from '../assets/images/padron.png';

// Define types directly in this file to avoid import issues
interface StoreInfo {
  name: string;
  phone: string;
  address: string;
  email?: string;
  openingHours?: string;
  description?: string;
}

interface CigarProduct {
  id: string;
  name: string;
  brand: string;
  origin: string;
  strength: 'Mild' | 'Medium' | 'Full';
  size: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
  wrapper: string;
  binder: string;
  filler: string;
}

interface CigarKnowledge {
  id: string;
  title: string;
  content: string;
  category: 'Basics' | 'History' | 'Production' | 'Tasting' | 'Storage';
  image?: string;
  readTime: number;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
}

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  backgroundImage?: string;
}

// Store Information
export const storeInfo: StoreInfo = {
  name: 'BH Luxury Cigar',
  phone: '0975224557',
  address: '138 phường Bình Hàn ,thành phố Hải Dương',
  email: 'info@bhluxurycigar.com',
  openingHours: 'Thứ 2 - Chủ nhật: 9:00 - 22:00',
  description: 'Cửa hàng cigar cao cấp với bộ sưu tập đa dạng từ các thương hiệu nổi tiếng thế giới. Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng nhất và dịch vụ tư vấn chuyên nghiệp.'
};

// Navigation Items
export const navigationItems: NavItem[] = [
  { id: 'home', label: 'Trang chủ', href: '#home' },
  { id: 'about', label: 'Về chúng tôi', href: '#about' },
  { id: 'products', label: 'Sản phẩm', href: '#products' },
  { id: 'knowledge', label: 'Kiến thức Cigar', href: '#knowledge' },
  { id: 'contact', label: 'Liên hệ', href: '#contact' }
];

// Hero Content
export const heroContent: HeroContent = {
  title: 'BH Luxury Cigar',
  subtitle: 'Chất lượng - Đẳng cấp - Truyền thống',
  description: 'Khám phá thế giới cigar cao cấp với bộ sưu tập độc đáo từ các thương hiệu nổi tiếng. Trải nghiệm hương vị tinh tế và dịch vụ chuyên nghiệp.',
  ctaText: 'Khám phá ngay'
};

// Sample Cigar Products
export const cigarProducts: CigarProduct[] = [
  {
    id: '1',
    name: 'Cohiba Siglo VI',
    brand: 'Cohiba',
    origin: 'Cuba',
    strength: 'Medium',
    size: '6" x 52',
    price: 2500000,
    description: 'Một trong những dòng cigar cao cấp nhất của Cuba, mang đến hương vị phong phú và cân bằng hoàn hảo.',
    inStock: true,
    wrapper: 'Connecticut Shade',
    binder: 'Dominican',
    filler: 'Dominican, Nicaraguan',
    image: siglo6Image
  },
  {
    id: '2',
    name: 'Montecristo No. 2',
    brand: 'Montecristo',
    origin: 'Cuba',
    strength: 'Medium',
    size: '6.1" x 52',
    price: 1800000,
    description: 'Cigar torpedo huyền thoại với hương vị đậm đà và độ cháy đều tuyệt vời.',
    inStock: true,
    wrapper: 'Habano',
    binder: 'Cuban',
    filler: 'Cuban',
    image: montecristoImage
  },
  {
    id: '3',
    name: 'Romeo y Julieta Churchill',
    brand: 'Romeo y Julieta',
    origin: 'Cuba',
    strength: 'Mild',
    size: '7" x 47',
    price: 1500000,
    description: 'Cigar mang tên của Winston Churchill, có hương vị nhẹ nhàng và thanh lịch.',
    inStock: true,
    wrapper: 'Natural',
    binder: 'Cuban',
    filler: 'Cuban',
    image: churchillImage
  },
  {
    id: '4',
    name: 'Davidoff Millennium Blend',
    brand: 'Davidoff',
    origin: 'Dominican Republic',
    strength: 'Full',
    size: '6" x 50',
    price: 2200000,
    description: 'Cigar cao cấp từ Davidoff với hương vị phức tạp và finish dài.',
    inStock: true,
    wrapper: 'Ecuadorian',
    binder: 'Dominican',
    filler: 'Dominican, Peruvian',
    image: davidoffImage
  },
  {
    id: '5',
    name: 'Arturo Fuente Opus X',
    brand: 'Arturo Fuente',
    origin: 'Dominican Republic',
    strength: 'Full',
    size: '5.6" x 46',
    price: 3000000,
    description: 'Cigar siêu cao cấp với wrapper lá Dominican độc đáo, hương vị đậm đà và phức tạp.',
    inStock: false,
    wrapper: 'Dominican',
    binder: 'Dominican',
    filler: 'Dominican',
    image: arturoImage
  },
  {
    id: '6',
    name: 'Padron 1964 Anniversary',
    brand: 'Padron',
    origin: 'Nicaragua',
    strength: 'Full',
    size: '6.5" x 42',
    price: 1900000,
    description: 'Cigar Nicaragua cao cấp với hương vị chocolate và coffee đặc trưng.',
    inStock: true,
    wrapper: 'Maduro',
    binder: 'Nicaraguan',
    filler: 'Nicaraguan',
    image: padronImage
  }
];

// Cigar Knowledge Articles
export const cigarKnowledge: CigarKnowledge[] = [
  {
    id: '1',
    title: 'Cách bảo quản Cigar đúng cách',
    content: 'Bảo quản cigar đúng cách là yếu tố quan trọng nhất để duy trì chất lượng và hương vị. Cigar cần được lưu trữ ở độ ẩm 65-72% và nhiệt độ 18-21°C. Humidor là thiết bị tốt nhất để bảo quản cigar, giúp duy trì độ ẩm ổn định và bảo vệ cigar khỏi ánh sáng và mùi lạ.',
    category: 'Storage',
    readTime: 5
  },
  {
    id: '2',
    title: 'Lịch sử phát triển của Cigar',
    content: 'Cigar có nguồn gốc từ người Maya và Aztec ở Trung Mỹ từ hàng nghìn năm trước. Christopher Columbus đã mang cigar đến châu Âu vào thế kỷ 15. Cuba trở thành trung tâm sản xuất cigar cao cấp từ thế kỷ 19 và vẫn giữ vị trí này cho đến ngày nay.',
    category: 'History',
    readTime: 8
  },
  {
    id: '3',
    title: 'Cách cắt và châm Cigar',
    content: 'Cắt cigar đúng cách rất quan trọng cho trải nghiệm hút. Sử dụng dao cắt cigar chuyên dụng, cắt khoảng 2-3mm từ đầu cigar. Khi châm, xoay cigar đều để lửa phân bố đồng đều, không để lửa tiếp xúc trực tiếp với tobacco.',
    category: 'Basics',
    readTime: 6
  },
  {
    id: '4',
    title: 'Quy trình sản xuất Cigar thủ công',
    content: 'Sản xuất cigar là một nghệ thuật đòi hỏi kỹ năng cao. Từ việc trồng và thu hoạch lá tobacco, qua các giai đoạn lên men, phân loại, đến cuộn cigar thủ công bởi những nghệ nhân có kinh nghiệm. Mỗi điếu cigar cao cấp đều được làm hoàn toàn bằng tay.',
    category: 'Production',
    readTime: 10
  },
  {
    id: '5',
    title: 'Hướng dẫn nếm thử Cigar cho người mới',
    content: 'Nếm thử cigar là một trải nghiệm tinh tế. Hãy hút nhẹ nhàng, giữ khói trong miệng để cảm nhận hương vị trước khi thở ra. Chú ý đến các note hương như gỗ, da, chocolate, coffee, gia vị. Uống nước hoặc rượu whisky để làm sạch vị giác giữa các lần hút.',
    category: 'Tasting',
    readTime: 7
  }
];