import { pkg } from '@carbon/ibm-products'

// // Enable 'canary' (not yet reviewed/released) components
// // that we want to make use of
// pkg.component.AboutModal = true
// pkg.component.SidePanel = true
pkg.component.Datagrid = true

// // Live dangerously: enable all components!
pkg.setAllComponents(true)

// // Enable a feature flagged examples
// pkg.feature.nameOfFeature = true
// pkg.feature['Component.feature'] = true
pkg.feature.useDatagrid = true

// // Live dangerously: enable all pre-release features!
pkg.setAllFeatures(true)

new EventSource('/esbuild').addEventListener('change', () => location.reload())
