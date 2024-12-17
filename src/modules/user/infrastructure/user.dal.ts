import { GenericDal } from "../../../utils/generic.dal";
import { User } from "../domain/user.entity";

export class UserDal extends GenericDal<User> {
  constructor() {
    super(User.name);
  }
}