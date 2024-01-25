module.exports = {
    collectCoverage: true,
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['D:\\Forex_Remittance\\forex-remittance\\frontend\\jest.setup.js'],
    transformIgnorePatterns: ['D:\\Forex_Remittance\\forex-remittance\\frontend\\node_modules/'],
    moduleNameMapper: {
      '^.+\\.(css|styl|less|sass|scss|png|jpg|jpeg|gif|webp|avif|svg|ttf|woff|woff2|eot|otf)$':
        'identity-obj-proxy',
    },
  };
  
  