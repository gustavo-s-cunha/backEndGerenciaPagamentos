//import vine from '@vinejs/vine'

//export const createUserValidator = vine.compile(
//  vine.object({
//    name: vine.string().minLength(5),
//    email: vine.string().email(),
//    password: vine.string().minLength(6),
//    role: vine.enum(["ADMIN", "MANAGER", "FINANCE", "USER"])
//  })
//)

export class createUserValidator {
  async validate(data: any) {
    const { default: vine } = await import('@vinejs/vine');
    
    const schema = vine.object({
      name: vine.string().minLength(5),
      email: vine.string().email(),
      password: vine.string().minLength(6),
      role: vine.enum(["ADMIN", "MANAGER", "FINANCE", "USER"])
    });

    return await vine.validate({ schema, data });
  }
}