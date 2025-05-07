type BookPreview = {
  id: string;
  title: string;
  imgSrc: string;
  authorNames: string[];
  reviewCount: number;
  ratingPoint: number;
};

export const mockBooks: BookPreview[] = [
  {
    id: '680ba213787795b6b67e8b95',
    title: 'Số Đỏ',
    imgSrc:
      'https://static.oreka.vn/800-800_af691e7a-2d44-4875-8fad-1311bde56fe8.webp',
    authorNames: ['Vũ Trọng Phụng'],
    reviewCount: 312,
    ratingPoint: 4.7,
  },
  {
    id: '680ba213787795b6b67e8b99',
    title: 'Cánh Đồng Bất Tận',
    imgSrc:
      'https://salt.tikicdn.com/cache/w1200/media/catalog/product/d/a/dac-nhan-tam.jpg',
    authorNames: ['Nguyễn Ngọc Tư'],
    reviewCount: 890,
    ratingPoint: 4.8,
  },
  {
    id: '680ba213787795b6b67e8b98',
    title: 'Mắt Biếc',
    authorNames: ['Nguyễn Nhật Ánh'],
    imgSrc:
      'https://salt.tikicdn.com/cache/w1200/media/catalog/product/d/a/dac-nhan-tam.jpg',

    reviewCount: 420,
    ratingPoint: 4.6,
  },
  {
    id: '680ba213787795b6b67e8b9b',
    title: 'Dế mèn phiêu lưu ký',
    authorNames: ['Tô Hoài'],
    imgSrc:
      'https://salt.tikicdn.com/cache/w1200/media/catalog/product/d/a/dac-nhan-tam.jpg',
    reviewCount: 580,
    ratingPoint: 4.9,
  },
  {
    id: '680ba213787795b6b67e8b97',
    title: 'Người Thợ Xây',
    imgSrc:
      'https://salt.tikicdn.com/cache/w1200/media/catalog/product/d/a/dac-nhan-tam.jpg',
    authorNames: ['Nguyễn Minh Châu'],
    reviewCount: 215,
    ratingPoint: 4.5,
  },
];
