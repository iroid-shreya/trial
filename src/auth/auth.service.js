import jwt from "jsonwebtoken";
import User from "../../model/user";
import {
  bcryptPassword,
  matchHashedPassword,
  randomStringGenerator,
  storeAccessToken,
} from "../common/helper";
import { JWT } from "../common/constants/constant";

class AuthService {
  /**
   * @description Register
   * @param {*} reqData
   */
  static async register(reqData, files) {
    const findUser = await User.findOne({ email: reqData.email });
    if (findUser) {
      return { message: "user already exist", status: 409 };
    } else {
      if (files.profile) {
        reqData.profile =
          files.profile[0].destination + "/" + files.profile[0].filename;
      }
      if (files.images) {
        console.log(1);
        reqData.images = [];

        await Promise.all(
          files.images.map((img) => {
            reqData.images.push(img.destination + "/" + img.filename);
          })
        );

        console.log(reqData.images);
      }
      reqData.password = await bcryptPassword(reqData.password);

      const user = await User.create(reqData);

      const randomString = await randomStringGenerator();

      // generate jwt token
      const token = await jwt.sign(
        { id: user._id, jti: randomString },
        JWT.SECRET, //jwt secret
        { expiresIn: "1 YEAR" } // expire time
      );

      // store access token
      await storeAccessToken(user, randomString);

      user.token = token;
      // const token = await
      return user;
    }
  }

  static async login(reqData) {
    const findUser = await User.findOne({ email: reqData.email });

    if (!findUser) {
      return { message: "User not found", status: 404 };
    } else {
      const matchPassword = await matchHashedPassword(
        reqData.password,
        findUser.password
      );

      if (!matchPassword) {
        return { message: "password mismatched", status: 422 };
      }

      const randomString = await randomStringGenerator();

      const token = await jwt.sign(
        { id: findUser._id, jti: randomString },
        JWT.SECRET,
        { expiresIn: "1 YEAR" }
      );

      await storeAccessToken(findUser, randomString);
      findUser.token = token;

      return findUser;
    }
  }
}

export default AuthService;
