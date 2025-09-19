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
  return (
    <div className='min-h-screen bg-white'>
      {/* Fixed Header */}
      <Header header={data.header} />

      <main className='relative'>
        {/* Hero Section - Home */}
        <section id='home' className='relative min-h-screen'>
          {data.hero && <Hero hero={data.hero} />}
        </section>

        {/* Value Proposition Section */}
        {data.valueProposition && (
          <section id='about' className='py-20 bg-gray-50'>
            <ValueProposition valueProposition={data.valueProposition} />
          </section>
        )}

        {/* Project Details Section */}
        {data.projectDetail && (
          <section id='project-detail' className='py-20 bg-white'>
            <ProjectDetail projectDetail={data.projectDetail} />
          </section>
        )}

        {/* Gallery Section */}
        {data.gallery && (
          <section id='gallery' className='py-20 bg-gray-50'>
            <Gallery gallery={data.gallery} />
          </section>
        )}

        {/* Floor Plans Section */}
        {data.floorPlans && (
          <section id='floor-plans' className='py-20 bg-white'>
            <FloorPlans floorPlans={data.floorPlans} />
          </section>
        )}

        {/* Location Section */}
        {data.location && (
          <section id='location' className='py-20 bg-gray-50'>
            <Location location={data.location} />
          </section>
        )}

        {/* Call to Action Section */}
        {data.cta && (
          <section id='cta' className='py-20 bg-primary-600'>
            <CTA cta={data.cta} />
          </section>
        )}

        {/* Register Interest Section */}
        {data.registerInterest && (
          <section id='register-interest' className='py-20 bg-white'>
            <RegisterInterest registerInterest={data.registerInterest} />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer footer={data.footer} />
    </div>
  );
};

export default Template;
