import React from 'react';
import { CampaignData } from '../../schema/campaignSchema';
import Header from './components/Header';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Location from './components/Location';
import RegisterInterest from './components/RegisterInterest';
import ProjectDetail from './components/ProjectDetail';
import Gallery from './components/Gallery';
import FloorPlans from './components/FloorPlans';

interface TemplateProps {
  data: CampaignData;
}

const Template: React.FC<TemplateProps> = ({ data }) => {
  const renderPageContent = () => {
    switch (data.route) {
      case 'home':
        return (
          <>
            {data.hero && <Hero hero={data.hero} />}
            {data.valueProposition && <ValueProposition valueProposition={data.valueProposition} />}
            {data.cta && <CTA cta={data.cta} />}
          </>
        );
      
      case 'location':
        return data.location ? <Location location={data.location} /> : null;
      
      case 'register-interest':
        return data.registerInterest ? <RegisterInterest registerInterest={data.registerInterest} /> : null;
      
      case 'projectDetail':
        return data.projectDetail ? <ProjectDetail projectDetail={data.projectDetail} /> : null;
      
      case 'gallery':
        return data.gallery ? <Gallery gallery={data.gallery} /> : null;
      
      case 'floorPlans':
        return data.floorPlans ? <FloorPlans floorPlans={data.floorPlans} /> : null;
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
              <p className="text-gray-600">The requested route "{data.route}" does not exist.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header header={data.header} />
      <main>
        {renderPageContent()}
      </main>
      <Footer footer={data.footer} />
    </div>
  );
};

export default Template;