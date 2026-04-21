import React, { Suspense, lazy } from 'react'
import './home.css'

const Header = lazy(() => import('../../components/header/header'));
const FeaturedCategories = lazy(() => import('../../components/FeaturedCategories/featured-categories'));
const SpecialSections = lazy(() => import('../../components/SpecialSections/SpecialSections'));
const OurServices = lazy(() => import('../../components/OurServices/OurServices'));
const AppDownload = lazy(() => import('../../components/AppDownload/AppDownload'));

const SectionLoader = () => (
  <div style={{ minHeight: '20vh', display: 'grid', placeItems: 'center', color: '#666' }}>
    Loading section...
  </div>
);

const Home = () => {
  return (
    <div id="top">
      <Suspense fallback={<SectionLoader />}>
        <Header />
        <FeaturedCategories />
        <SpecialSections />
        <div id="OurServices">
          <OurServices />
        </div>
        <AppDownload />
      </Suspense>
    </div>
  )
}

export default Home