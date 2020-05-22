module.exports = {
  name: 'proof-and-useage',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/proof-and-useage',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
