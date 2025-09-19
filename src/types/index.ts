export interface ApiError {
  error: string;
  message: string;
  validationErrors?: Array<{
    path: string;
    message: string;
    code: string;
  }>;
}

export interface GenerateResponse {
  success: boolean;
  data: {
    businessName: string;
    timestamp: string;
    files: { [filename: string]: string };
    metadata: {
      campaignName: string;
      pagesGenerated: number;
      totalFiles: number;
    };
  };
}

export interface RouteOption {
  path: string;
  label: string;
}

export interface PreviewNavigationMessage {
  type: 'PREVIEW_NAVIGATE';
  route: string;
}
