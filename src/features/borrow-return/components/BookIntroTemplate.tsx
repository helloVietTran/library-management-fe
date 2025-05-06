interface BookIntroTemplateProps {
  name?: string;
  bookTitle?: string;
  author?: string;
  description?: string;
}

const BookIntroTemplate: React.FC = ({
  name,
  bookTitle,
  author,
  description,
}) => {
  return (
    <div className="font-sans text-gray-800">
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="bg-blue-600 py-4 text-center text-white">
          <h1 className="text-xl font-bold">Giới thiệu sách mới</h1>
        </div>
        <div className="p-6">
          <p className="mb-4 text-lg">
            Chào <span className="font-semibold">{name}</span>,
          </p>
          <p className="mb-4">
            Thư viện Vbrary xin giới thiệu đến bạn một tựa sách hấp dẫn mà bạn
            không nên bỏ lỡ:
          </p>
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="font-semibold">Thông tin sách:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Tên sách:</strong> {bookTitle}
              </li>
              <li>
                <strong>Tác giả:</strong> {author}
              </li>
            </ul>
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p className="font-semibold">Mô tả:</p>
            <p>{description}</p>
          </div>
          <p className="mt-4">
            Hãy ghé thăm thư viện Vbrary để mượn sách và khám phá thêm nhiều tựa
            sách thú vị khác.
          </p>
          <p className="mt-4 text-gray-600">
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
          </p>
        </div>
        <div className="bg-gray-200 py-4 text-center text-sm text-gray-600">
          © 2025 Thư viện Vbrary. Mọi quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default BookIntroTemplate;
