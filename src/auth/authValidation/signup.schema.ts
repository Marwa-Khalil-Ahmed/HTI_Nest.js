import z from 'zod'

export const SignupSchema = z.object({
    email:z.email(),
    name:z.string(),
    password:z.string(),
    confirmPassword:z.string(),
    age:z.number().positive()
}).superRefine((args,ctx)=>{
    if (args.password!=args.confirmPassword) {
        ctx.addIssue({
            code:"custom",
            path:['confimPassword'],
            message:"password must be equal to confirm password"
        })
    }
})