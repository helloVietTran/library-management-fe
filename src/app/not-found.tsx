'use client';
import { Button } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page container mx-auto">
      <div className="mx-auto w-full md:w-8/12">
        <img
          className="mx-auto w-[600px]"
          src="/img/error/error-404.png"
          alt="Not Found"
        />
        <div className="text-center">
          <h1 className="text-primary mt-4 text-3xl font-bold">NOT FOUND</h1>
          <p className="mt-2 text-xl text-gray-600">
            The page you are looking for was not found.
          </p>

          <Link href="/">
            <Button type="primary" size="large" className="mt-4">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
