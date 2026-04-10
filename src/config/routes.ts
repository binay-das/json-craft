export const ROUTES = {
  HOME: '/',
  TOOLS: '/tools',
  TOOL_DETAIL: (name: string) => `/tool/${name}`,
  
  PATTERNS: {
    HOME: '/',
    TOOLS: 'tools',
    TOOL_DETAIL: 'tool/:name',
  }
};
