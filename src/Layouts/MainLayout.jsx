import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import DevPanel from '../Components/DevPanel';
import ScrollToTop from '../components/ScrollToTop';
import { Toaster } from 'sonner';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* <DevPanel /> */}
      <Toaster 
        position="bottom-right" 
        richColors 
        closeButton
        duration={3000}
      />
    </div>
  );
};

export default MainLayout;
