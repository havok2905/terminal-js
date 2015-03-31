var system = new System([
  { type: 'file', name: 'foo', extension: 'txt', text: 'foo'},
  { type: 'file', name: 'bar', extension: 'txt', text: 'bar' },
  { type: 'file', name: 'baz', extension: 'txt', text: 'baz' },
  { type: 'directory', name: 'foo', contents: [
    { type: 'file', name: 'foo', extension: 'txt', text: 'foo' },
    { type: 'file', name: 'bar', extension: 'txt', text: 'bar' },
    { type: 'file', name: 'baz', extension: 'txt', text: 'baz' },
    { type: 'directory', name: 'foobar', contents: [
      { type: 'file', name: 'foo', extension: 'txt', text: 'foo' }
    ]}
  ]}
]);
