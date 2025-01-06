export default function defaultDict(defaultValue) {
  return new Proxy(
    {},
    {
      get(target, name) {
        if (!(name in target)) {
          target[name] = defaultValue();
        }
        return target[name];
      },
    }
  );
}
