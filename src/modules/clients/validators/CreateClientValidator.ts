//import vine from "@vinejs/vine"

//export const createClientValidator = vine.compile(
//  vine.object({
//    name: vine.string().minLength(5),
//    email: vine.string().email()
//  })
//)
export class createClientValidator {
  async validate(data: any) {
    const { default: vine } = await import('@vinejs/vine');
    
    const schema = vine.object({
      name: vine.string().minLength(5),
      email: vine.string().email()
    });

    return await vine.validate({ schema, data });
  }
}