import Link from 'next/link';

import MaskDescription from '@/components/MaskDescription';
import { generateRandomId } from "@/utils/randomId";
import { Author } from '@/types/types';


interface AboutAuthorProps {
    data: Author;
}

const AboutAuthor: React.FC<AboutAuthorProps> = ({
    data
}) => {
    return (
        <div key={generateRandomId()}>
            <div className="flex items-center mt-4">

                <div className="w-16 h-16 relative">
                    <Link
                        href={`/authors/${data._id}`}
                    >
                        <img
                            src={data.avatar || "/img/default-avatar.png"}
                            alt="Author Avatar"
                            className="rounded-full w-full h-full object-cover"
                        />
                    </Link>

                </div>

                <div className="ml-4">
                    <h2 className="text-sm font-semibold mb-2 text-primary">{data.name}</h2>
                    <p className="text-sm text-gray-600">quốc tịch: {data.nationality}</p>
                </div>
            </div>

            <MaskDescription
                className='mt-4 text-sm'
                content={data.biography || "Không có mô tả"}
            />
        </div>
    );
}

export default AboutAuthor;
