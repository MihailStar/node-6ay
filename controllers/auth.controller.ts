import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/user.model';
import RoleModel, { Role } from '../models/role.model';
import generateAccessToken from '../utils/generateAccessToken';

class Controller {
  static async registration(
    req: Request<
      import('express-serve-static-core').ParamsDictionary,
      unknown,
      { username: string; password: string }
    >,
    res: Response
  ): Promise<void> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: 'Registration error', errors: errors.array() });
        return;
      }

      const { username, password } = req.body;
      const candidate = await UserModel.findOne({ username });

      if (candidate !== null) {
        res.status(400).json({ message: 'User exists' });
        return;
      }

      const hashedPassword = bcryptjs.hashSync(password, 7);
      // const userRole = (await RoleModel.findOne({ value: 'ADMIN' })) as Role;
      const userRole = (await RoleModel.findOne({ value: 'USER' })) as Role;
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        roles: [userRole.value],
      });
      const user = await newUser.save();
      const token = generateAccessToken(user._id, user.roles);

      res.json({ message: 'Registration successful', token });
    } catch (error) {
      process.stderr.write(`${error}\n`);
      res.status(400).json({ message: `${error.name}: ${error.message}` });
    }
  }

  static async login(
    req: Request<
      import('express-serve-static-core').ParamsDictionary,
      unknown,
      { username: string; password: string }
    >,
    res: Response
  ): Promise<void> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: 'Login error', errors: errors.array() });
        return;
      }

      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (user === null) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      const isPasswordValid = bcryptjs.compareSync(password, user.password);

      if (!isPasswordValid) {
        res.status(400).json({ message: 'Password not valid' });
        return;
      }

      const token = generateAccessToken(user._id, user.roles);

      res.json({ message: 'Login successful', token });
    } catch (error) {
      process.stderr.write(`${error}\n`);
      res.status(400).json({ message: `${error.name}: ${error.message}` });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      // await RoleModel.create(new RoleModel({ value: 'USER' }));
      // await RoleModel.create(new RoleModel({ value: 'ADMIN' }));
      const users = await UserModel.find();

      res.json(users);
    } catch (error) {
      process.stderr.write(`${error}\n`);
      res.status(400).json({ message: `${error.name}: ${error.message}` });
    }
  }
}

export default Controller;
