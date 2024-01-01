export const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode 
    res.status(statusCode)
    res.send({
        massage: res.massage,
        stack:  process.env.NODE_ENV === "prodaction" ? null : err.stack
    })
}