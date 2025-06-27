import { conf } from "../config/config.mjs";

const globalErrorHandler = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;

   return res.status(statusCode).json({
      message: err.message,
      errorStack: conf.env == "development" ? err.stack : "production",
   });
};

export default globalErrorHandler;
