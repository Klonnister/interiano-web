export const NSerializer = {
  read: (v: any) => v === '' ? null : Number(v),
  write: (v: any) => v !== null ? String(v) : '',
}
