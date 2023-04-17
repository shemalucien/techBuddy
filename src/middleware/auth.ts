import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();
const JWT_SECRET = "amalitech";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    token = token?.replace("Bearer ", "");
  //  console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token",
        });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
       // console.log(decoded);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error,
        });
    }
}
export const adminauthorize = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    token = token?.replace("Bearer ", "");
    //console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token",
        });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(decoded);
    if (!decoded) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    if (decoded) {
        const jsonObject = JSON.stringify(decoded);
        const obj = JSON.parse(jsonObject);
        const role = obj.role;
        console.log("role",role);
        if (role === "admin") {
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

    }


}

