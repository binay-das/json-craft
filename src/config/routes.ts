export const ROUTES = {
  HOME: '/',
  TOOLS: '/tools',
  DOCS: '/docs',
  TOOL_DETAIL: (name: string) => `/tool/${name}`,

  PATTERNS: {
    HOME: '/',
    TOOLS: 'tools',
    DOCS: 'docs',
    TOOL_DETAIL: 'tool/:name',
  }
};
