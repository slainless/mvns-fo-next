export function makeDisplayName<Base extends string>(base: Base) {
  return <Ext extends string>(name: Ext): `${Base}.${Ext}` => `${base}.${name}`
}
