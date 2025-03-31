/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Definir o diretório de origem (src)
  distDir: '.next',
};

module.exports = nextConfig; 