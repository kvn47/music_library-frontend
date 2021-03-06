const path = require('path');

// Configuration for your app

module.exports = function (ctx) {
  return {
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'api',
      'cable'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'fontawesome-v5',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QAvatar',
        'QBanner',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QBtn',
        'QBtnDropdown',
        'QBtnGroup',
        'QBtnToggle',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QCheckbox',
        'QCircularProgress',
        'QDate',
        'QDialog',
        'QDrawer',
        'QExpansionItem',
        'QFab',
        'QFabAction',
        'QField',
        'QFooter',
        'QHeader',
        'QIcon',
        'QImg',
        'QInnerLoading',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QLinearProgress',
        'QList',
        'QMenu',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QParallax',
        'QPopupEdit',
        'QPopupProxy',
        'QRouteTab',
        'QScrollArea',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QSpinner',
        'QSpinnerBars',
        'QSpinnerPie',
        'QStep',
        'QStepper',
        'QStepperNavigation',
        'QTab',
        'QTabs',
        'QToggle',
        'QToolbar',
        'QToolbarTitle',
        'QTree'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'LoadingBar'
      ],

      // iconSet: 'ionicons-v4'
      lang: 'ru' // Quasar language
    },

    supportIE: false,

    build: {
      distDir: '../backend/public',

      env: ctx.prod ? {
        API: JSON.stringify(''),
        WS: JSON.stringify('wss://my3.k4ir05.xyz/cable')
      } : {
        API: JSON.stringify('http://localhost:9000'),
        WS: JSON.stringify('ws://localhost:9000/cable')
      },

      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueRouterMode: 'hash',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /node_modules/
        })

        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          api: path.resolve(__dirname, './src/api'),
          lib: path.resolve(__dirname, './src/lib')
        }
      }
    },

    devServer: {
      // https: true,
      port: 8000,
      open: false,
      proxy: {
        '/uploads': {
          target: 'http://localhost:9000'
        }
      }
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: 'Music Library',
        short_name: 'Music Lib',
        description: 'Music Library',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#cfd8dc',
        theme_color: '#3f51b5',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      id: 'org.cordova.quasar.music_library'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
};
