import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../database/models/user';
import {IUser} from '../types/user';

class AuthController 
{
  public async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password,role } = req.body;
      const userExists: IUser | null = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: 'Email already exists' });
        return;
      }
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const user: IUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hashedPassword,
        role: role
      });
     const newUser: IUser = await User.create(user);
     const token: string = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
      res.status(201).json({
        message: 'User created',
        user: {
          _id: newUser._id
        },
        token,
        expiresIn: 3600,
     });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      const passwordMatches: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (!passwordMatches) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      const token: string = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        message: 'Login successful',
        token,
        expiresIn: 3600,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  public async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const {id}=req.params;
      const userId: string = id;
      const user: IUser | null = await User.findById(userId).select(
        '-password'
      );
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({
        message: 'User found',
        user,
        userId: user._id,
      });	
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  // get all users
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: IUser[] = await User.find();
      res.status(200).json({
        message: 'Users found',
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export const authController = new AuthController();
