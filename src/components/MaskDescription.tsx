import React, { useState, useEffect, useRef } from 'react';

interface MaskDescriptionProps {
  content: string;
  className?: string;
}

const MaskDescription: React.FC = ({ content, className }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, offsetHeight } = contentRef.current;
      setHasMore(scrollHeight > offsetHeight); // Kiểm tra nếu nội dung bị cắt
    }
  }, [content]);

  return (
    <div className={`mask-des ${className}`}>
      <p
        ref={contentRef}
        className={`description text-gray-700 ${
          isExpanded ? 'expanded' : 'collapsed'
        } ${hasMore ? 'has-more' : 'no-has-more'}`}
      >
        {content}
      </p>
      {hasMore && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-sm text-blue-500 hover:underline"
        >
          {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default MaskDescription;
