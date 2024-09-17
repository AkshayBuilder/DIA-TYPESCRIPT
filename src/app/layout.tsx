'use client'
import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Adjust the path based on your project structure
import { ReactNode } from 'react';
import Loading from './loading';
import { SearchComponent } from '@/components/search';

 const metadata: Metadata = {
  title: 'Workshop Diagnal',
  description: 'Movie Listing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
    <html lang="en">
      <body
        className={cn(
          'bg-[#171717] text-[#ffffff] font-titillium antialiased'
        )}
      > 
         <div className="group flex w-full">
          
            
          <div className="flex-1 flex flex-col min-h-screen ">
            <div className="sticky top-0 z-10  dark:bg-black ">
              <div className=" py-4 ">
                <Suspense fallback={<Loading />}>
                  <SearchComponent />
                </Suspense>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4">{children}</div>
          </div>
        </div>
        
      </body>
    </html>
    </Provider>
    
  );
}
