import React from 'react';
import { InternalSchemaType } from '../../schema/internalSchema';
import { mapInternalSchemaToTemplate, TemplateData } from './utils/schemaMapper';
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
  data: InternalSchemaType;
}

const Template: React.FC<TemplateProps> = ({ data }) => {
  // Map internal schema to template data format
  const templateData: TemplateData = mapInternalSchemaToTemplate(data);

  // Add smooth scrolling behavior
  React.useEffect(() => {
    // Smooth scroll polyfill for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href.includes('#')) {
        const targetId = target.href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className='min-h-screen bg-white' style={{ scrollBehavior: 'smooth' }}>
      {/* Fixed Header */}
      <Header header={templateData.header} />

      <main className='relative'>
        {/* Hero Section - Home */}
        <section id='home' className='relative min-h-screen'>
          {templateData.hero && <Hero hero={templateData.hero} />}
        </section>

        {/* Value Proposition Section */}
        {templateData.valueProposition && (
          <section id='about' className='py-20 bg-gray-50'>
            <ValueProposition valueProposition={templateData.valueProposition} />
          </section>
        )}

        {/* Project Details Section */}
        {templateData.projectDetail && (
          <section id='project-detail' className='py-20 bg-white'>
            <ProjectDetail projectDetail={templateData.projectDetail} />
          </section>
        )}

        {/* Gallery Section */}
        {templateData.gallery && (
          <section id='gallery' className='py-20 bg-gray-50'>
            <Gallery gallery={templateData.gallery} />
          </section>
        )}

        {/* Floor Plans Section */}
        {templateData.floorPlans && (
          <section id='floor-plans' className='py-20 bg-white'>
            <FloorPlans floorPlans={templateData.floorPlans} />
          </section>
        )}

        {/* Location Section */}
        {templateData.location && (
          <section id='location' className='py-20 bg-gray-50'>
            <Location location={templateData.location} />
          </section>
        )}

        {/* Call to Action Section */}
        {templateData.cta && (
          <section id='cta' className='py-20 bg-primary-600'>
            <CTA cta={templateData.cta} />
          </section>
        )}

        {/* Register Interest Section */}
        {templateData.registerInterest && (
          <section id='register-interest' className='py-20 bg-white'>
            <RegisterInterest registerInterest={templateData.registerInterest} />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer footer={templateData.footer} />
    </div>
  );
};

export default Template;
