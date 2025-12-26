import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Number,
  })
  age: number;

  @Prop({
    type: String,
    default: GenderEnum.MALE,
  })
  gender: GenderEnum;

  @Prop({
    type: Boolean,
    default: false,
  })
  isConfirmed: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

export const UserModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: userSchema,
  },
]);
