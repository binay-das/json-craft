import { 
  FileJson, 
  Replace, 
  Code2, 
  Database, 
  Search, 
  ShieldCheck 
} from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: any;
  category: 'json' | 'api' | 'utility';
}

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data instantly.',
    href: '/tool/json-formatter',
    icon: FileJson,
    category: 'json',
  },
  {
    id: 'csv-to-json',
    name: 'CSV → JSON Converter',
    description: 'Convert structured CSV data into JSON format seamlessly.',
    href: '/tool/csv-to-json',
    icon: Replace,
    category: 'json',
  },
  {
    id: 'json-schema',
    name: 'JSON Schema Generator',
    description: 'Automatically generate JSON Schema definitions from your JSON data.',
    href: '/tool/json-schema',
    icon: Code2,
    category: 'json',
  },
  {
    id: 'api-mock',
    name: 'API Mock Generator',
    description: 'Generate mock API responses and snippets from your API definition.',
    href: '/tool/api-mock',
    icon: Database,
    category: 'api',
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regular expressions against any string and see matches highlighted.',
    href: '/tool/regex-tester',
    icon: Search,
    category: 'utility',
  },
  {
    id: 'data-validator',
    name: 'Data Validator',
    description: 'Validate JSON data against a JSON Schema for structural integrity.',
    href: '/tool/data-validator',
    icon: ShieldCheck,
    category: 'utility',
  },
];
