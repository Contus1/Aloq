// TypeScript helpers to suppress Supabase type inference issues
// TODO: Remove once Supabase types are properly generated

export const suppressTypeError = <T>(value: T): any => value;
