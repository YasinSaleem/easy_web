import { GenerateResponse } from '../types';

/**
 * Downloads a single file
 */
export const downloadFile = (content: string, filename: string, mimeType = 'text/html') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Creates and downloads a ZIP file from generated data
 */
export const createAndDownloadZip = async (data: GenerateResponse['data']) => {
  try {
    // Try to use JSZip if available
    const JSZip = await import('jszip');
    const zip = new JSZip.default();
    
    // Add all files to ZIP
    Object.entries(data.files).forEach(([filename, content]) => {
      zip.file(filename, content);
    });

    // Generate and download ZIP
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.businessName}-website-${data.timestamp}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.warn('JSZip not available, downloading individual files');
    // Fallback: download individual files
    Object.entries(data.files).forEach(([filename, content]) => {
      downloadFile(content, filename);
    });
  }
};