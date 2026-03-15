//import vine from "@vinejs/vine"

//export const createProductValidator = vine.compile(
//  vine.object({
//    name: vine.string().minLength(3),
//    amount: vine.number().min(0)
//  })
//)
export class createProductValidator {
  async validate(data: any) {
    const { default: vine } = await import('@vinejs/vine');
    
    const schema = vine.object({
      name: vine.string().minLength(3),
      amount: vine.number().min(0)
    });

    return await vine.validate({ schema, data });
  }
}