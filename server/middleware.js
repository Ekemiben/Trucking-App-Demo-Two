import jwt from "jsonwebtoken"

const Admin = (req, res, next) => {
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ message: "You're not authenticated" });
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.jwt_key, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token", error: err });
        }

        req.user = data;

        if (req.user.role === "admin") {
            return next();
        } else {
            return res.status(403).json({ message: "You're not authorized" });
        }
    });
};

const driver = (req, res, next) => {
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ message: "You're not authenticated" });
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.jwt_key, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token", error: err });
        }
        req.user = data;

        if (req.user.role === "driver" || req.user.role === "admin") {
            return next();
        } else {
            return res.status(403).json({ message: "You're not authorized" });
        }
    });
};

const client = (req, res, next) => {
    const header = req.headers.authorization;
    
    if (!header) {
        return res.status(401).json({ message: "You're not authenticated" });
    }

    const token = header.split(" ")[1];

    jwt.verify(token, process.env.jwt_key, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token", error: err });
        }
        req.user = data;

        if (req.user.role === "client") {
            return next();
        } else {
            return res.status(403).json({ message: "You're not authorized" });
        }
    });
};

export {Admin,driver, client}