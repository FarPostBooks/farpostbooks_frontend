module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: ['../public'],
  // core: {
  //   builder: '@storybook/builder-vite',
  // },
  // async viteFinal(config) {
  //   return mergeConfig(config, {
  //     server: {
  //       port: 6006,
  //       host: 'fblibrary.local',
  //     },
  //   })
  // },
  // docs: {
  //   autodocs: 'tag',
  // },
}
