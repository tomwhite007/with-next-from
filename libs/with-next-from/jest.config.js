module.exports = {
  name: 'with-next-from',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/with-next-from',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
