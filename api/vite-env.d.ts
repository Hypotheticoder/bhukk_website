interface ImportMetaEnv {
  readonly VITE_API_BASE: string;
  // add more environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}